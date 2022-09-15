const fs = require("fs");
const promises = fs.promises;
const path = require("path");
const express = require("express");

const formsRouter = require("./routes/forms");
const studentFormsRouter = require("./routes/studentForms");

const { v4: uuidv4 } = require("uuid");
const { FileService } = require("./services/syslemFileService");
const app = express();
const PORT_NUMBER = 9000;

const cors = require("cors");
app.use(cors());

// const bodyParser = require("body-parser");

// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, x-Request-With, Content-Type, Accept");
  next();
});

app.use("/api/forms", formsRouter);

app.use("/api/students_forms", studentFormsRouter);

app.listen(PORT_NUMBER, () => console.log(`Server is listening on port ${PORT_NUMBER}`));
