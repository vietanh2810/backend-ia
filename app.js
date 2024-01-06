var createError = require('http-errors');
const express = require("express");
var path = require('path');
var cookieParser = require('cookie-parser');
const socketIo = require('socket.io');
var logger = require('morgan');
const auth = require("./middlewares/auth");
const db = require("./models");
const userController = require("./controllers/user");
const recipeController = require("./controllers/recipe");
const cors = require('cors');

const dotenv = require("dotenv");
dotenv.config();
dotenv.config({ path: `.env.local`, override: true });

const http = require("http");
const {OpenAI} = require("openai");
const port = process.env.PORT || '3002';

const app = express();
const server = http.createServer(app);
app.use(cors());

const io = socketIo(server, {
  cors: {
      origin: "*", // This allows all origins, you can restrict it to specific domains
      methods: ["GET", "POST"],
      credentials: true
  }
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const recipeRouter = require("./routes/recipes");

app.use('/images', express.static('public/images'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/recipes", recipeRouter);

db.sequelize.sync({ force: true }).then(async () => {
  console.log("db has been re-synced");

  await userController.createDefaultAdmin();
  await userController.createDefaultWebmaster();

  await recipeController.createDefaultRecipe();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error');
});


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("New user connected");

  const conversationHistory = [
    {
      role: "system",
      content: `You are a Michelin-starred chef with over 15 years of experience and numerous international culinary awards.
                Your expertise ranges from classic French cuisine to innovative modern dishes.
                You're known for your creative flavor combinations and impeccable presentation skills.
                Users will ask you for culinary advice, recipes, cooking techniques, and food pairings. 
                Respond to them with detailed, professional, and insightful culinary guidance.
                Write your responses as if you are interacting in a sophisticated yet approachable manner, fitting of a world-class chef.`
    }
  ];


  socket.on("sendMessage", async (message, callback) => {
    try {
      // Add the user message to the conversation history
      conversationHistory.push({ role: "user", content: message });

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: conversationHistory,
      });

      const response = completion.choices[0].message.content;

      // Add the assistant's response to the conversation history
      conversationHistory.push({ role: "assistant", content: response });

      socket.emit("message", response);
      callback();
    } catch (error) {
      console.error(error);
      callback("Error: Unable to connect to the chatbot");
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(port, () => {
  console.log("Server listening on port " + port);
});

module.exports = app;
