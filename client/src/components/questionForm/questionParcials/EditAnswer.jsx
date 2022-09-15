import React from "react";
import { AccordionDetails } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { BsFileText } from "react-icons/bs";
// import { ShortTextIcon } from "@material-ui/icons";
import ShortTextIcon from "@material-ui/icons/ShortText";

const EditAnswer = ({
  i,
  setOptionPoints,
  setOptionAnswer,
  doneAnswer,
  ques,
}) => {
  return (
    <AccordionDetails className="add_question">
      {/* <div
      className="question_boxes"
      style={{ display: "flex", flexDirection: "column" }}
    > */}
      <div className="top_header">בחר את התשובה הנכונה:</div>
      <div className="add_question_top">
        <input
          type="text"
          className="question"
          placeholder="Question"
          value={i + 1 + ". " + ques.questionText}
          // disabled
        />
        <p style={{ fontSize: "12px" }}>מהו הניקוד המקסימלי עבור השאלה: </p>
        <input
          type="number"
          className="points"
          min="0"
          step="1"
          placeholder="0"
          onChange={(e) => setOptionPoints(e.target.value, i)}
        />
      </div>
      {ques.options.map((op, j) => {
        return (
          <div
            className="add_question_body"
            key={j}
            style={{
              marginLeft: "8px",
              marginBottom: "10px",
              marginTop: "5px",
            }}
          >
            <div key={j}>
              <div style={{ display: "flex" }}>
                <div className="form-check">
                  <label
                    style={{
                      fontSize: "13px",
                      display: "flex",
                    }}
                    onClick={() =>
                      setOptionAnswer(ques.options[j].optionText, i)
                    }
                  >
                    {ques.questionType !== "text" ? (
                      <input
                        className="form-check-input"
                        type={ques.questionType}
                        name={ques.questionText}
                        value="option3"
                        required={ques.required}
                        style={{ margin: "4px 10px 10px 15px" }}
                        // style={{ margin: "0 0 0 10px" }}
                      />
                    ) : (
                      <ShortTextIcon style={{ marginRight: "10px" }} />
                    )}
                    {ques.options[j].optionText}
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="add_question_body">
        <Button
          size="small"
          style={{
            textTransform: "none",
            color: "#4285f4",
            fontSize: "13px",
            fontWeight: "600",
          }}
        >
          <BsFileText style={{ fontSize: "20px", marginRight: "8px" }} />
          Add Answer Feedback
        </Button>
      </div>
      <div className="add_question_bottom">
        <Button
          variant="outlined"
          color="primary"
          style={{
            textTransform: "none",
            color: "#4285f4",
            fontSize: "13px",
            fontWeight: "600",
          }}
          onClick={() => {
            doneAnswer(i);
          }}
        >
          Done
        </Button>
      </div>
      {/* </div> */}
    </AccordionDetails>
  );
};

export default EditAnswer;
