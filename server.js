let express = require('express');
let app = express();
let webRoutes = require('./routes/web');
let appRoutes = require('./routes/app');
let adminRoutes = require('./routes/admin');
let authMiddleware = require('./middlewares/AuthMiddleware');

let cookieParser = require('cookie-parser');
let session = require('express-session');
let flash = require('express-flash');
let sessionStore = new session.MemoryStore;
let passport = require('passport');

/**
 * Configurations
 */

let appConfig = require('./configs/app');

// Configuraciones para el view engine
let exphbs = require('express-handlebars');
// Imports a set of helpers for handlebars
// https://github.com/helpers/handlebars-helpers
let hbshelpers = require("handlebars-helpers");
let multihelpers = hbshelpers();
const extNameHbs = 'hbs';
let hbs = exphbs.create({
  extname: extNameHbs,
  helpers: multihelpers
});
app.engine(extNameHbs, hbs.engine);
app.set('view engine', extNameHbs);

// Configuraciones para el bodyparser
app.use(express.urlencoded({ extended: true }))

// Configuraciones de las sesiones
app.use(cookieParser());
app.use(session({
  cookie: { maxAge: 60000 },
  store: sessionStore,
  saveUninitialized: true,
  resave: 'true',
  secret: appConfig.secret
}));
app.use(flash());

// Configuraciones de passport
require('./configs/passport');

app.use(passport.initialize());
app.use(passport.session());

/**
 * Routes
 */
app.use('/', webRoutes);
app.use('/app', authMiddleware.isAuth, appRoutes);
app.use('/app/users', authMiddleware.hasAdminPrivileges, adminRoutes);

/**
 * App Init
 */
app.listen(appConfig.expressPort, () => {
  console.log(`Server is listenning on ${appConfig.expressPort}! (http://localhost:${appConfig.expressPort})`);
});
