import { useState } from "react";
import EditAnswer from "./questionParcials/EditAnswer";
import AddEditQuestion from "./questionParcials/AddEditQuestion";
import QuestionVisability from "./questionParcials/QuestionVisability";

import { Accordion } from "@material-ui/core";

import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import { Typography } from "@material-ui/core";

import "./QuestionUI.css";
import { Draggable } from "react-beautiful-dnd";
import uuid from "react-uuid";
import { Transition } from "react-transition-group";

const MAX_ANSWERS = 5;

function QuestionsUI({ questions, setQuestions }) {
  const [questionType, setQuestionType] = useState("");
  // State of the MUI Accordion
  const [expanded, setExpanded] = useState(false);

  function changeQuestionText(text, index) {
    // TODO:
    // 2) debug changes

    const newQuestions = [...questions];
    newQuestions[index].questionText = text;
    setQuestions(newQuestions);
  }

  function questionTypeHandler(index, type) {
    // TODO:
    // 2) debug changes
    const newQuestions = [...questions];
    newQuestions[index].questionType = type;

    if (
      // MAKES SURE THAT RADIO QUESTION HAS 5 OPTIONS
      type === "radio" &&
      newQuestions[index].options.length !== 5
    ) {
      newQuestions[index].options = [
        { optionText: "כלל לא" },
        { optionText: "במידה מעטה" },
        { optionText: "במידה בינונית" },
        { optionText: "במידה רבה" },
        { optionText: "במידה רבה מאוד" },
      ];
    }
    setQuestions(newQuestions);
  }

  function handleOptionValue(text, i, j) {
    const newQuestions = [...questions];
    newQuestions[i].options[j].optionText = text;
    setQuestions(newQuestions);
  }

  function removeOption(questionIndex, optionIndex) {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex].options.length > 1) {
      newQuestions[questionIndex].options.splice(optionIndex, 1);
      setQuestions(newQuestions);
    }
  }

  function addOption(i) {
    const newQuestions = [...questions];
    if (newQuestions[i].options.length < MAX_ANSWERS) {
      newQuestions[i].options.push({
        optionText: "Option " + (newQuestions[i].options.length + 1),
      });
      setQuestions(newQuestions);
    } else {
      console.log(`${MAX_ANSWERS} is the Maximum options allowed`);
    }
  }

  // function copyQuestion(i) {
  //   const newQuestions = [...questions];
  //   const newSingleQuestion = { ...newQuestions[i], id: uuid() };
  //   const qsCopy = JSON.parse(JSON.stringify(newSingleQuestion));
  //   newQuestions.splice(i + 1, 0, qsCopy);
  //   setQuestions(newQuestions);
  // }

  function deleteQuestion(i) {
    const newQuestions = [...questions];
    newQuestions.splice(i, 1);
    setQuestions(newQuestions);
  }

  function handleRequiredQuestion(i) {
    const newQuestions = [...questions];
    newQuestions[i].required = !newQuestions[i].required;
    setQuestions(newQuestions);
  }

  function handleHideQuestion(i) {
    const newQuestions = [...questions];
    newQuestions[i].hidden = !newQuestions[i].hidden;
    setQuestions(newQuestions);
  }

  function addQuestionField(i, question_type) {
    const newQuestions = [...questions];
    const newQues =
      question_type === "radio"
        ? {
            id: uuid(),
            questionType: "radio",
            questionText: "Question text...",
            open: true,
            required: false,
            hidden: false,
            options: [
              { optionText: "כלל לא" },
              { optionText: "במידה מעטה" },
              { optionText: "במידה בינונית" },
              { optionText: "במידה רבה" },
              { optionText: "במידה רבה מאוד" },
            ],
          }
        : {
            id: uuid(),
            questionType: "textarea",
            questionText: "Question text...",
            open: true,
            required: false,
            hidden: false,
            options: [{}],
          };
    newQuestions.splice(i + 1, 0, newQues);
    setQuestions(newQuestions);
    // setQuestions([...questions, newQues]);
  }

  function expandCloseAll() {
    const newQuestions = [...questions];
    for (let j = 0; j < newQuestions.length; j++) {
      newQuestions[j].open = false;
    }
    setQuestions(newQuestions);
  }

  // Closes all questions beside the one the user is modifing
  function handleExpend(id, isExpanded) {
    setExpanded(isExpanded ? id : false);
  }

  function setOptionAnswer(ans, qno) {
    const newQuestions = [...questions];
    newQuestions[qno].answerKey = ans;
    setQuestions(newQuestions);
    console.log(qno + " " + ans);
  }

  function setOptionPoints(points, qno) {
    const newQuestions = [...questions];
    newQuestions[qno].points = points;
    setQuestions(newQuestions);
    console.log(qno + " " + points);
  }

  function doneAnswer(i) {
    const newQuestions = [...questions];
    newQuestions[i].answer = !newQuestions[i].answer;
    setQuestions(newQuestions);
  }

  function addAnswer(i) {
    const newQuestions = [...questions];
    newQuestions[i].answer = !newQuestions[i].answer;
    setQuestions(newQuestions);
  }

  // console.log(questions);

  return questions.map((ques, i) => (
    <Draggable key={i} draggableId={i + "id"} index={i}>
      {(provided, snapshot) => (
        // Draggable Wrapper
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div>
            <div style={{ marginBottom: "0px" }}>
              <div
                style={{
                  width: "100 %",
                  marginBottom: "0px",
                  display: "flex",
                }}
              >
                <DragIndicatorIcon
                  style={{
                    transform: "rotate(-90deg)",
                    color: "#7a7a7a",
                    position: "relative",
                    right: "50%",
                  }}
                  fontSize="small"
                />
              </div>
              {/* Single Question Accordion - The Draggable gets the key prop */}

              <Accordion
                dir="rtl"
                onChange={(event, isExpanded) => {
                  handleExpend(ques.id, isExpanded);
                }}
                expanded={ques.id === expanded}
                className={ques.id === expanded ? "add_border" : ""}
                // Transition={<Transition timeout={0} />}
                TransitionProps={{
                  timeout: {
                    appear: 0,
                    enter: 0,
                    exit: 0,
                  },
                }}
                timeout={{
                  appear: 0,
                  enter: 0,
                  exit: 0,
                }}
              >
                {/* {ques.hidden && <Typography style={{ color: "red" }}>Hidden</Typography>} */}
                {/* Header -HOW THE QUESTION LOOK LIKE*/}
                <QuestionVisability ques={ques} i={i} expanded={expanded} />

                {/* ADD AND MODIFY QUESTIONS */}

                <AddEditQuestion
                  i={i}
                  ques={ques}
                  questionsLength={questions.length}
                  questionType={questionType}
                  changeQuestionText={changeQuestionText}
                  questionTypeHandler={questionTypeHandler}
                  removeOption={removeOption}
                  handleOptionValue={handleOptionValue}
                  MAX_ANSWERS={MAX_ANSWERS}
                  addOption={addOption}
                  handleRequiredQuestion={handleRequiredQuestion}
                  deleteQuestion={deleteQuestion}
                  addQuestionField={addQuestionField}
                  addAnswer={addAnswer}
                  handleHideQuestion={handleHideQuestion}
                ></AddEditQuestion>
              </Accordion>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  ));
}

export default QuestionsUI;

{
  /* <div className="question_edit">
<AddCircleOutlineIcon
className="edit"
onClick={addQuestionField}
/>
<OndemandVideoIcon className="edit" />
<CropOriginalIcon className="edit" />
<TextFieldsIcon className="edit" />
</div> */
}

{
  /* {!ques.answer && (
  <div className="question_edit">
    <AddCircleOutlineIcon
      onClick={addQuestionField}
      className="edit"
    />
    <OndemandVideoIcon className="edit" />
    <CropOriginalIcon className="edit" />
    <TextFieldsIcon className="edit" />
  </div>
)} */
}
