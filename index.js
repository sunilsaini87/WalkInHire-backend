import express, { urlencoded } from "express";
import connectDB from "./db/connection.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();

// connect db
connectDB();

const PORT = process.env.PORT;
const app = express();

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "https://walk-in-hire.vercel.app", //frontend origin
    credentials: true, // Enable cookies and other credentials
  })
);

// Remove redundant custom middleware since `cors` middleware handles it
/*
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://walk-in-hire.vercel.app");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
*/

app.get("/api/v1/company/getcompany", (req, res) => {
  res.json({ message: "CORS policy works!" });
});

// api's route
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
