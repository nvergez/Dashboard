function getDomain() {
    var domain = ""
    if (process.env.DEPLOY_ENV === "TRUE") {
        domain = "http://35.187.25.109"
      } else {
        domain = "http://localhost"
      }
    return domain
}

module.exports = getDomain;