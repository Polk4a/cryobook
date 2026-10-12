const express = require('express');
const helmet = require('helmet');

//const healthRoutes = require('./routes/health');

const { requestId } = require('./middlewares/request-id');
const { authenticate } = require('./middlewares/auth');
const { routeGuard } = require('./middlewares/rbac');
const { errorHandler } = require('./middlewares/errors');




const app = express();
app.disable('x-powered-by'); // Supprime l’en-tête X-Powered-By: Express, qui révèle la technologie utilisée.
app.use(requestId); // Attribue sans doute un identifiant unique à chaque requête (utile pour les logs).
app.use(helmet()); // Ajoute des en-têtes de sécurité (X-Content-Type-Options, Strict-Transport-Security, etc.).
app.use(express.json({ limit: '10kb'})); // Parse les corps JSON et rejette ceux de plus de 10 Ko.
app.use('/api', authenticate); // Pour toute requête commençant par /api : d’abord on vérifie l’identité (authentification),
app.use('/api', routeGuard); // puis les droits d’accès (probablement du RBAC, contrôle d’accès par rôles).
app.use('/api/cryostats', require('./routes/cryostats')); // Branche les routeurs des cryostats
app.use('/api/bookings', require('./routes/bookings')); // et des réservations.
app.use('/api', errorHandler); // Gestionnaire d’erreurs central.

// app.use(express.json());
// app.use('/api/health', healthRoutes);

module.exports = app;
