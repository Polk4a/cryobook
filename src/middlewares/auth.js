function authenticate(req, res, next) {
  next(); // TODO : vérifier le jeton
}

module.exports = { authenticate };
