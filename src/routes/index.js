const router = require('express').Router();
const crypto = require('crypto');

router.post('/reports/hash', (req, res) => {
  const { data = 'report' } = req.body || {};
  const salt = crypto.randomBytes(16);
  const hash = crypto.pbkdf2Sync(String(data), salt, 600000, 64, 'sha512');
  //console.log(hash);
  res.status(200).json({ salt: salt.toString('hex'), hash: hash.toString('hex') });
});

module.exports = router;
