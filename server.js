// Imports
const express = require('express');
const serverless = require('serverless-http')
let webRoutes = require('./routes/web');
let appRoutes = require('./routes/app');
let adminRoutes = require('./routes/admin');
let authMiddleware = require('./middlewares/AuthMiddleware');

// Session imports
let cookieParser = require('cookie-parser');
let session = require('express-session');
let flash = require('express-flash');
let passport = require('passport');

// Express app creation
const app = express();
const router = express.Router()

module.exports.handler = serverless(app)

//Socket.io
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Configurations
const appConfig = require('./configs/app');

// View engine configs
const exphbs = require('express-handlebars');
const hbshelpers = require("handlebars-helpers");
const multihelpers = hbshelpers();
const extNameHbs = 'hbs';
const hbs = exphbs.create({
  extname: extNameHbs,
  helpers: multihelpers
});
app.engine(extNameHbs, hbs.engine);
app.set('view engine', extNameHbs);

// Session configurations
let sessionStore = new session.MemoryStore;
app.use('/.netlify/functions/api', router)
app.use(cookieParser());
app.use(session({
  cookie: { maxAge: 1500000 },
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

// Receive parameters from the Form requests
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/', express.static(__dirname + '/public'));
app.use('/', webRoutes);
app.use('/app', authMiddleware.isAuth, appRoutes);
app.use('/app/users', authMiddleware.hasAdminPrivileges, adminRoutes);

io.on('disconnect', (socket) => {
  console.log("Client Disconnected");
})


io.on('connection', (socket) => {
  socket.on('message-to-server', (data) => {
    console.log('message received', data);
  });


  socket.on('enter-room', (data) => {
    socket.join(data.room);
    let n = 0
    let interval = setInterval(() => {
      io.emit('toast', { message: "El jugador " + data.user + " ha llegado, denle un cálido aplauso" })
      n++;
      if (n < 5) {
        clearInterval(interval);
      }
    }, 5000)
    io.emit('toast', { message: "El jugador " + data.user + " ha llegado, denle un cálido aplauso" });
    io.to(data.room).emit("room-enter", { roomId: data.roomId })
    io.to(data.room).emit("toast", { message: "El jugador " + data.user + " ha llegado, denle un cálido aplauso" })

  })
});

// App init
server.listen(appConfig.expressPort, () => {
  console.log(`Server is listenning on ${appConfig.expressPort}! (http://localhost:${appConfig.expressPort})`);
});
