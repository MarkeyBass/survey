const fs = require("fs");
const promises = fs.promises;
const path = require("path");
const express = require("express");

const formsRouter = require("./routes/forms");

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

app.get("/api/get_all_filenames", (req, res) => {
  const dirPath = path.join(__dirname, `survey_documents`);
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.log("Unable to read from directory: " + err);
    } else {
      res.send({ all_form_documents: files });
    }
  });
});

// app.post("/api/questions/:form_id", async (req, res) => {
//   const doc_data = req.body;
//   const name = req.params.form_id;
//   // console.log({ doc_data });
//   // DOTO:
//   const doc_name = doc_data.documentName;
//   const doc_id = req.params.form_id;

//   const dirPath = path.join(__dirname, `survey_documents`);
//   const data = JSON.stringify(doc_data);

//   try {
//     let files = await promises.readdir(dirPath);

//     let listOfTakenNames = [];
//     let has_duplicate_document_name = false;

//     for (const file of files) {
//       let cur_doc_json = await promises.readFile(path.join(__dirname, `survey_documents`, file));
//       let cur_doc_obj = JSON.parse(cur_doc_json);
//       listOfTakenNames = [...listOfTakenNames, cur_doc_obj.documentName];
//       if (
//         cur_doc_obj.documentId.trim() !== doc_id.trim() &&
//         cur_doc_obj.documentName.trim() === doc_name.trim()
//       ) {
//         has_duplicate_document_name = true;
//       }
//     }
//     console.log({ has_duplicate_document_name, listOfTakenNames: listOfTakenNames });
//     if (has_duplicate_document_name) {
//       let error = new Error();
//       error.data = {
//         errorMsg: "Name of document already exists please choose another name.",
//         listOfTakenNames,
//         errorCode: 10,
//       };

//       throw error;
//     } else {
//       await promises.writeFile(`survey_documents/${name}.json`, data);
//     }
//     res.status(200).json("ok");
//   } catch (err) {
//     console.log(err);
//     res.status(500).send(err.data || { errorMsg: "server unexpected problem..." });
//   }

//   // const data = JSON.stringify(doc_data);
//   // fs.writeFile(
//   //   `survey_documents/${name}.json`,
//   //   data,
//   //   {
//   //     encoding: "utf8",
//   //     flag: "w",
//   //   },
//   //   (err) => {
//   //     if (err) {
//   //       console.log(err);
//   //     } else {
//   //       res.status(200).send(doc_data);
//   //     }
//   //   }
//   // );
// });

app.use("/api/questions", formsRouter);

// app.get("/api/questions/:form_id", (req, res) => {
//   const name = req.params.form_id;
//   fs.readFile(`survey_documents/${name}.json`, (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       let doc_data = JSON.parse(data);
//       console.log(req.params.form_id, "--> was sent to the client");
//       res.send({ form_data: doc_data });
//     }
//   });
// });

app.get("/api/studentsForm/:form_id", (req, res) => {
  const name = req.params.form_id;
  fs.readFile(`survey_documents/${name}.json`, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(`<h1>Unable to post the data: Status: 400</h1>`);
    } else {
      let doc_data = JSON.parse(data);
      // deleting the hidden questions:
      const questionsModified = doc_data.questions.filter((q, index) => !q.hidden);
      doc_data.questions = questionsModified;
      // console.log({ questions: questionsModified });
      console.log(req.params.form_id, "--> was sent to the client");
      res.send({ form_data: doc_data });
    }
  });
});

app.post("/api/studentsForm/:doc_id", (req, res) => {
  const id = req.params.doc_id;
  // console.log(req.params);
  const cur_date = new Date();
  const answers = req.body.answers;
  // console.log({ answers: req.body.answers });
  const document_name = req.body.documentName;
  const document_description = req.body.documentDescription;
  const users_id = req.body.usersId;
  let rate = 0;
  let radioAnswersCount = 0;
  answers.forEach((answer) => {
    console.log({ snswer: answer.answer });
    if (answer.questionType === "radio" && answer.answer !== "") {
      radioAnswersCount++;
      // Adding one to the rate calculation because it answer.answer is an index.
      rate += parseInt(answer.answer);
    }
  });
  rate = radioAnswersCount > 0 ? rate / radioAnswersCount : rate;
  rate = rate.toFixed(2);

  // console.log({ answers, rate, curDate: cur_date, document_name, document_description });

  const dirPath = path.join(__dirname, `student_answers`, id);
  fs.mkdir(dirPath, { recursive: true }, (err) => {
    if (err) console.log(err);
  });
  fs.writeFile(
    path.join(dirPath, `/${users_id}.json`),
    JSON.stringify({
      survey_id: id,
      date: cur_date,
      document_name,
      document_description,
      answers,
      currentSurveyRating: rate,
    }),
    {
      encoding: "utf8",
      flag: "w",
    },
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  console.log({ rate });

  res.send({ msg: "answer receved" });
});

app.listen(PORT_NUMBER, () => console.log(`Server is listening on port ${PORT_NUMBER}`));
