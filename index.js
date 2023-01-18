const express = require("express");
const Sentry = require("@sentry/node");

const app = express();

Sentry.init({
  dsn: "___DSN___",
  environment: "local",
  release: `backend-test@$1`,
});
app.use(Sentry.Handlers.requestHandler());

app.get("/test", async (req, res, next) => {
  const promise = new Promise((resolve, reject) => {
    reject(new Error("Something bad hapened"));
  });

  res.json();
});

app.use(Sentry.Handlers.errorHandler());

app.listen(3000);
console.log("Listening on port 3000");
