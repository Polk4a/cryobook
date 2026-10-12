function routeGuard(req, res, next) {
  next(); // TODO : vérifier les rôles
}

module.exports = { routeGuard };
