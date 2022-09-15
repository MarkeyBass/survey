// import React from "react";

// import SubjectIcon from "@material-ui/icons/Subject";
// import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
// import CloseIcon from "@material-ui/icons/Close";
// import ShortTextIcon from "@material-ui/icons/ShortText";
// import { Button } from "@material-ui/core";
// import CropOriginalIcon from "@material-ui/icons/CropOriginal";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
// import CheckBoxIcon from "@material-ui/icons/CheckBox";
// import FilterNoneIcon from "@material-ui/icons/FilterNone";
// import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
// import { FiCornerRightUp as FcRigthUp } from "react-icons/fi";

import { AccordionDetails, Typography } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Switch } from "@material-ui/core";
import { BsTrash } from "react-icons/bs";
import { InputLabel } from "@material-ui/core";
import { FormHelperText } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { TextareaAutosize } from "@material-ui/core";
import { useStateValue } from "../../../context/StateProvider";

// Direct Child of QuestionUI
const AddEditQuestion = ({
  i,
  ques,
  questionsLength,
  changeQuestionText,
  handleOptionValue,
  addQuestionField,
  handleRequiredQuestion,
  handleHideQuestion,
  deleteQuestion,
  // questionTypeHandler,
}) => {
  const [{ documentNamesArray }, dispatch] = useStateValue();
  // console.log({ documentNamesArray });

  return (
    <AccordionDetails className="add_question">
      <div className="question_boxes" style={{ display: "flex", flexDirection: "column" }}>
        {ques.hidden && (
          <Typography
            style={{
              color: "red",
              alignSelf: "center",
              fontFamily: "monospace",
              fontSize: "2rem",
            }}
          >
            This Question Is Hidden
          </Typography>
        )}

        <div className="add_question_top">
          <input
            type="text"
            className="question"
            placeholder="Question"
            value={ques.questionText}
            onChange={(e) => {
              changeQuestionText(e.target.value, i);
            }}
          />
          {/* CHANG CURRENT QUESION TYPE */}
          {/* <div className="add_question_type">
            <FormControl style={{ textAlign: "center", minWidth: "210px" }}>
              <InputLabel id="add-question">Change Question Type</InputLabel>
              <Select value={}>
                <MenuItem
                  id="radio"
                  value="Radio"
                  onClick={() => questionTypeHandler(i, "radio")}
                >
                  <RadioButtonCheckedIcon
                    style={{
                      marginRight: "10px",
                      color: "#70757a",
                    }}
                    checked
                  />
                  Scale review (1-5)
                </MenuItem>
                <MenuItem
                  id="textarea"
                  value="Textarea"
                  onClick={() => questionTypeHandler(i, "textarea")}
                >
                  <SubjectIcon style={{ marginRight: "10px" }} />
                  Open Question
                </MenuItem>
              </Select>
            </FormControl>
          </div> */}
        </div>
        {ques.options.map((op, j) => (
          <div className="add_question_body" key={j}>
            {ques.questionType === "radio" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <input
                  type={ques.questionType}
                  style={{
                    marginRight: "10px",
                  }}
                  disabled
                />
                {/* <div style={{ display: "flex", flexDirection: "row" }}> */}
                <span style={{ marginRight: "5px" }}>{j + 1}. </span>
                <input
                  className="option_input"
                  type="text"
                  className="text_input"
                  placeholder="option"
                  value={`${ques.options[j].optionText}`}
                  onChange={(e) => {
                    handleOptionValue(e.target.value, i, j);
                  }}
                  style={{ marginTop: "2px", marginRight: "5px" }}
                />
                {/* </div> */}
              </div>
            ) : (
              j === 0 && (
                <TextareaAutosize
                  className="TextareaAutosize"
                  style={{
                    margin: "20px 20px",
                    width: "300px",
                    height: "150px",
                    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                    padding: "5px",
                  }}
                  disabled
                />
              )
            )}
          </div>
        ))}

        {/* FOOTER */}
        <div
          className="add_footer"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="add_question_buttom_right">
            <Divider />
            <div
              className="buttons_right"
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Switch
                name="checkedA"
                color="primary"
                checked={ques.required}
                onClick={() => handleRequiredQuestion(i)}
                // checked
              ></Switch>
              <span
                style={{
                  color: "#5f6368",
                  fontSize: "13px",
                }}
              >
                Required
              </span>

              <FormControl
                style={{
                  margin: "0 15px 0 0",
                  minWidth: "50px",
                  // display: "flex",
                }}
                // className="add_question_type"
              >
                <InputLabel id="add-question">Add Question</InputLabel>
                <Select style={{ minWidth: "9rem" }} value={"radio"}>
                  <MenuItem onClick={() => addQuestionField(i, "radio")} value={"radio"}>
                    Scale
                  </MenuItem>
                  <MenuItem onClick={() => addQuestionField(i, "textarea")} value={"textaria"}>
                    Open Question
                  </MenuItem>
                </Select>
                <FormHelperText>מוסיף שאלה חדשה מתחת לשאלה הנוכחית</FormHelperText>
              </FormControl>
            </div>
          </div>
          <div className="add_question_bottom_left">
            <Divider />
            <div
              className="buttons_left"
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "12px",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Switch
                  name="checkedB"
                  color="primary"
                  checked={ques.hidden}
                  value={ques.hidden}
                  onChange={() => handleHideQuestion(i)}
                ></Switch>
                <span
                  style={{
                    color: "#5f6368",
                    fontSize: "13px",
                  }}
                >
                  Hide Question
                </span>
              </div>
              {/* {console.log(questionsLength)} */}
              {questionsLength > 1 && (
                <IconButton aria-label="delete" onClick={() => deleteQuestion(i)}>
                  <BsTrash color="red" />
                </IconButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </AccordionDetails>
  );
};

export default AddEditQuestion;
