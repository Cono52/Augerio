const redis = require("redis");
const session = require("express-session");
const redisStore = require("connect-redis")(session);

const redisClient = redis.createClient(
  process.env.REDIS_PORT,
  process.env.REDIS_HOST,
  { password: process.env.REDIS_PASSWORD }
);

function sessionMiddleware() {
  return session({
    name: "aug-sess",
    secret: process.env.SESSION_SECRET,
    store: new redisStore({
      client: redisClient,
      ttl: 260
    }),
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000,
      secure: false,
      httpOnly: false
    }
  });
}

redisClient.on("connect", function() {
  console.log("Redis client connected");
});
redisClient.on("error", function(err) {
  console.log("Something went wrong " + err);
});

function checkCookie(req, res, next) {
  if (req.session.key) {
    next();
  } else {
    res.sendStatus(401);
  }
}

module.exports = { sessionMiddleware, checkCookie };
