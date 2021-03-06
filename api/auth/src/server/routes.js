var { addHours } = require("date-fns");
var nodemailer = require("nodemailer");

var { User, UserSession } = require("../db/models");
var generateUUID = require("../helpers/generateUUID");
var hashPassword = require("../helpers/hashPassword");
var passwordCompareSync = require("../helpers/passwordCompareSync");
var getDomain = require("../helpers/getDomain");

var getImgurAccount = require("../oauth/imgur");

var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
      user: "yourfavoritedashboard@gmail.com",
      pass: "fei20fn20f2302f02"
  }
});

const USER_SESSION_EXPIRY_HOURS = 1;

const setupRoutes = app => {
  app.post("/sessions", async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
      return next(new Error("Invalid body!"));
    }

    try {
      const user = await User.findOne({ attributes: {}, where: { email: req.body.email } });

      if (!user) return next(new Error("User not found"));

      if (user.verified == false) {
        return next(new Error("Unverified user"))
      }

      if (req.body.password === "imgur") {
        const expiresAt = addHours(new Date(), USER_SESSION_EXPIRY_HOURS);

        const sessionToken = generateUUID();

        const userSession = await UserSession.create({
          expiresAt,
          id: sessionToken,
          userId: user.id
        });

        return res.json(userSession);
      }

      if (passwordCompareSync("imgur", user.passwordHash)) {
        const expiresAt = addHours(new Date(), USER_SESSION_EXPIRY_HOURS);

        const sessionToken = generateUUID();

        const userSession = await UserSession.create({
          expiresAt,
          id: sessionToken,
          userId: user.id
        });

        return res.json(userSession);
      }

      if (!passwordCompareSync(req.body.password, user.passwordHash)) {
        return next(new Error("Incorrect password"));
      }

      const expiresAt = addHours(new Date(), USER_SESSION_EXPIRY_HOURS);

      const sessionToken = generateUUID();

      const userSession = await UserSession.create({
        expiresAt,
        id: sessionToken,
        userId: user.id
      });

      return res.json(userSession);
    } catch (e) {
      return next(e);
    }
  });

  app.delete("/sessions/:sessionId", async (req, res, next) => {
    try {
      const userSession = await UserSession.findByPk(req.params.sessionId);

      if (!userSession) return next(new Error("Invalid session ID"));

      await userSession.destroy();

      return res.end();
    } catch (e) {
      return next(e);
    }
  });

  app.get("/sessions/:sessionId", async (req, res, next) => {
    try {
      const userSession = await UserSession.findByPk(req.params.sessionId);

      if (!userSession) return next(new Error("Invalid session ID"));

      return res.json(userSession);
    } catch (e) {
      return next(e);
    }
  });

  app.post("/users", async (req, res, next) => {
    if (!req.body.email || !req.body.password || !req.body.username) {
      return next(new Error("Invalid body!"));
    }

    try {
      var verified = false;
      if (req.body.password == "imgur") {
        verified = true;
      }
      const newUser = await User.create({
        email: req.body.email,
        username: req.body.username,
        id: generateUUID(),
        passwordHash: hashPassword(req.body.password),
        verified: verified
      });

      if (verified) {
        return res.json(newUser);
      }

      link = getDomain() + ":9000/verify?id=" + newUser.id;
      mailOptions = {
        to : req.body.email,
        subject : "Please confirm your email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
      }
      smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
          console.log(error);
        } else {
          console.log("Mail sent");
        }
      })
      return res.json(newUser);
    } catch (e) {
      return next(e);
    }
  });

  app.get("/users/:userId", async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.userId);

      if (!user) return next(new Error("Invalid user ID"));

      return res.json(user);
    } catch (e) {
      return next(e);
    }
  });

  app.delete("/users/:userId", async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.userId);

      if (!user) return next(new Error("Invalid session ID"));

      await user.destroy();

      return res.end();
    } catch (e) {
      return next(e);
    }
  });

  app.get("/verify", async (req, res, next) => {
    try {
      const user = await User.findByPk(req.query.id);
      if (!user) return next(new Error("Invalid link"));
      user.verified = true;
      await user.save();

      return res.redirect(getDomain() + "/home");
    } catch (e) {
      return next(e);
    }
  });

  app.post("/oauth_imgur/:userToken", async(req, res, next) => {
    const account_params = await getImgurAccount(req.params.userToken);
    console.log(account_params)

    if (!account_params.data.email) return next(new Error("Not email in account"));

    try {
      const newUser = await User.create({
        email: account_params.data.email,
        username: account_params.data.account_url,
        id: generateUUID(),
        passwordHash: hashPassword("imgur")
      });

      return res.json(newUser);
    } catch (e) {
      return next(e);
    }

  });
};

exports.setupRoutes = setupRoutes;