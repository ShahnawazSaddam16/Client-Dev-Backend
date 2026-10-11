const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnection = require("./src/config/mongoDB");
const devauthRoutes = require("./src/Dev-Portal/routes/authRoutes");
const userRoutes = require("./src/Dev-Portal/routes/userRoutes");
const projectRoutes = require("./src/Dev-Portal/routes/projectRoutes");

const clientauthRoutes = require("./src/Client-Portal/routes/authRoutes");

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "https://dev-portal.buttnetworks.com"],
    credentials: true,
  }),
);
app.use(cookieParser());

// dbConnection
dbConnection();

// Routes
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Server Running Successfully" });
});

app.use("/api/dev/auth", devauthRoutes);
app.use("/api/dev/users", userRoutes);
app.use("/api/dev/projects", projectRoutes);

app.use("/api/client/auth", clientauthRoutes);

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server Running at ${PORT} ✅✅`);
  }
});
