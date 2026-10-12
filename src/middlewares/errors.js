function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).json({ error: 'Erreur interne' });
}

module.exports = { errorHandler };
