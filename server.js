const mongoose = require("mongoose");
const https = require("https");
// const fs = require("fs");

const dotenv = require("dotenv");
const app = require("./app");

// const options = {
//   key: fs.readFileSync("key.pem"),
//   cert: fs.readFileSync("cert.pem+1.pem")
// }


dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  // .connect(process.env.DATABASE_LOCAL, { useNewUrlParser: true })
  .connect(DB, { useNewUrlParser: true })
  .then(() => console.log("connected to MongoDB Atlas..."));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
// https.createServer(options, app).listen(port,() => {
//   console.log(`https Server is running on port ${port}...`);
// });

process.on("unhandledRejection", (err) => {
  console.log("\nUNHANDLED REJECTION! Shutting down...\n");
  console.log(err.name, err.message, "\n");
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("Process Terminated!");
  });
});
