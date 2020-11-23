function getDomain() {
    var domain = ""
    if (process.env.DEPLOY_ENV == "TRUE") {
        domain = "http://35.187.25.109"
        console.log("DEPLOY ENV")
      } else {
        domain = "http://localhost"
        console.log("NON DEPLOY ENV")
      }
    return domain
}

module.exports = getDomain;