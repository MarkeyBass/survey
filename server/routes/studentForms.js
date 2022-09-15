const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/:form_id", (req, res) => {
  const name = req.params.form_id;
  fs.readFile(`./survey_documents/${name}`, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(`<h1>Unable to read the data from the server: Status: 400</h1>`);
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

router.post("/:doc_id", (req, res) => {
  const doc_id = req.params.doc_id;
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
    // console.log({ snswer: answer.answer });
    if (answer.questionType === "radio" && answer.answer !== "") {
      radioAnswersCount++;
      // Adding one to the rate calculation because it answer.answer is an index.
      rate += parseInt(answer.answer);
    }
  });
  rate = radioAnswersCount > 0 ? rate / radioAnswersCount : rate;
  rate = rate.toFixed(2);

  // console.log({ answers, rate, curDate: cur_date, document_name, document_description });

  const dirPath = path.join(__dirname, "../", `student_answers`, doc_id);
  // const dirPath = `./student_answers/${doc_id}`;
  fs.mkdir(dirPath, { recursive: true }, (err) => {
    if (err) console.log(err);
  });
  fs.writeFile(
    `${dirPath}/${users_id}.json`,
    JSON.stringify({
      survey_id: doc_id,
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

  res.send({ msg: "answer receved" });
});

module.exports = router;
