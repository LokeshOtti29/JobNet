const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connection = require("./utils/db");
const userRoute = require("./routes/userrouter");
const companyroute = require("./routes/companyrouter");
const jobroute = require("./routes/jobroute");
const applicationroute = require("./routes/applicationroute");
const path = require("path");
dotenv.config({});

const _dirname = path.resolve();
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "https://jobnet-571a.onrender.com",
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyroute);
app.use("/api/v1/job", jobroute);
app.use("/api/v1/application", applicationroute);
app.use(express.static(path.join(_dirname, "/fr-en/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "fr-en", "dist", "index.html"));
});

app.listen(PORT, () => {
  connection();
  console.log(`Server running at port ${PORT}`);
});
