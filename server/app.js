import "dotenv/config";
import express from "express";
const app = express();
app.use(express.json());


import cors from "cors";
app.use(cors({
  credentials: true,
  origin: true
}));

import session from "express-session";
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

import createUserTable from "./database/setupDatabase.js";
try{
  const result = await createUserTable();
  if(result) console.log(`Database connected and ${result}`);
} catch(err) {
  console.log(err);
}

import userAuth from "./routers/userAuth.js";
app.use(userAuth);

import userDashboard from "./routers/userDashboard.js";
app.use(userDashboard);

app.all("*", (req, res) => {
  res.status(404).send({ message: "Not Found" });
});

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, (error) =>
  error
    ? console.log("Internal Server Error", error)
    : console.log("Server is running on:", PORT)
);
