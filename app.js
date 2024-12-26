const express = require("express");
const bookRoutes = require("./routes/book.routes");
const authorRoutes = require("./routes/author.routes");
const categoryRoutes = require("./routes/category.routes");
const memberRoutes = require("./routes/member.routes");
const sequelize = require("./config/database");
const auth = require("./routes/authetication/registrationLogin.route");
const updateBorrowRoute = require("./routes/update/updateBorrow");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(express.json());

sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((error) => console.error("Database connection failed:", error));

// Sync databasee
sequelize.sync().then(() => console.log("Database synced"));

app.use("/api", bookRoutes);
app.use("/api", authorRoutes);
app.use("/api", categoryRoutes);
app.use("/api", memberRoutes);
app.use("/api", auth);
app.use("/api", updateBorrowRoute);

// centralized error handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
