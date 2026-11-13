const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const validateEnv = require("./src/config/validateEnv");
validateEnv();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnection = require("./src/config/mongoDB");
const devauthRoutes = require("./src/Dev-Portal/routes/authRoutes");
const userRoutes = require("./src/Dev-Portal/routes/userRoutes");
const devprojectRoutes = require("./src/Dev-Portal/routes/projectRoutes");
const devnotificationRoutes = require("./src/Dev-Portal/routes/notificationRoutes");

const clientauthRoutes = require("./src/Client-Portal/routes/authRoutes");
const clientprojectsRoutes = require("./src/Client-Portal/routes/projectRoutes");
const clientnotificationRoutes = require("./src/Client-Portal/routes/notificationsRoutes");
const clientmessagesRoutes = require("./src/Client-Portal/routes/chat-messagesRoutes");

const app = express();
const PORT = process.env.PORT;


// Middleware
app.use(express.json());
app.set('trust proxy', 1)
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "https://dev-portal.buttnetworks.com", "https://client-portal.buttnetworks.com"],
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
app.use("/api/dev/projects", devprojectRoutes);
app.use("/api/dev/notifications", devnotificationRoutes);

app.use("/api/client/auth", clientauthRoutes);
app.use("/api/client/projects", clientprojectsRoutes);
app.use("/api/client/notifications", clientnotificationRoutes);
app.use("/api/client/messages", clientmessagesRoutes);

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server Running at ${PORT} ✅✅`);
  }
});
