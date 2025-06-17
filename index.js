const express = require("express");
const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();
const cors = require("cors");
const allowedOrigins = [
  "http://localhost:3000",
  "https://beeyoondgamingsportstechdemo.netlify.app/"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));


// Connect DB
connectDB();

// Middleware
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
