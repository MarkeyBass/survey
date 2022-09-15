import { Button, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import "./UsersForm.css";
import { useStateValue } from "../../context/StateProvider";

import axios from "axios";
const UsersForm = () => {
  const quest = [];
  const post_answer = [];
  const history = useHistory();
  const [answer, setAnswer] = useState([]);
  const [{ questions, documentName, documentDescription, documentId }, dispatch] = useStateValue();

  function select(question, option) {
    const k = answer.findIndex((el) => el.question == question);

    answer[k].answer = option;
    setAnswer(answer);
    console.log(answer);
  }

  useEffect(() => {
    questions.map((question) => {
      answer.push({
        question: question.questionText,
        answer: " ",
      });
    });
    questions.map((question, questionIndex) => {
      quest.push({ header: question.questionText, key: question.questionText });
    });
  }, []);

  var post_answer_data = {};

  function selectinput(question, option) {
    const k = answer.findIndex((el) => el.question == question);

    answer[k].answer = option;
    setAnswer(answer);
    console.log(answer);
  }

  function selectcheck(e, que, option) {
    var d = [];
    var k = answer.findIndex((ele) => ele.question == que);
    if (answer[k].answer) {
      d = answer[k].answer.split(",");
    }
    if (e == true) {
      d.push(option);
    } else {
      var n = d.findIndex((el) => el.option == option);
      d.splice(n, 1);
    }
    answer[k].answer = d.join(",");
    setAnswer(answer);
  }

  async function submit() {
    answer.map((el) => {
      post_answer_data[el.question] = el.answer;
    });
    try {
      const res = await axios.post(`http://localhost:9000/api/studentResponse/${documentName}`, {
        column: quest,
        answer_data: [post_answer_data],
      });

      console.log(res);
    } catch (err) {
      console.log(err);
    }

    // history.push(`/submitted`);
  }

  return (
    <div className="submit" dir="rtl">
      <div className="user_form ">
        <div className="user_form_section">
          <div className="user_title_section">
            <Typography style={{ fontSize: "26px" }}>{documentName}</Typography>
            <Typography style={{ fontSize: "15px" }}>{documentDescription}</Typography>
          </div>

          {questions.map((ques, i) => {
            if (!ques.hidden) {
              return (
                <div className="user_form_questions " key={i}>
                  {/* {console.log(question.id)} */}
                  <Typography
                    style={{
                      fontSize: "15px",
                      fontWeight: "400",
                      letterSpacing: ".1px",
                      lineHeight: "24px",
                      paddingBottom: "8px",
                      fontSize: "14px",
                    }}
                  >
                    {i + 1}. {ques.questionText}
                  </Typography>
                  {ques.options.map((option, j) => (
                    <div key={j} style={{ marginBottom: "5px" }}>
                      <div style={{ display: "flex" }}>
                        <div className="form-check">
                          {ques.questionType != "radio" ? (
                            ques.questionType != "text" ? (
                              <label>
                                <input
                                  type={ques.questionType}
                                  name={j}
                                  value={option.optionText}
                                  className="form-check-input"
                                  required={ques.required}
                                  style={{
                                    margnLeft: "5px",
                                    marginRight: "5px",
                                  }}
                                  onChange={(e) => {
                                    selectcheck(
                                      e.target.checked,
                                      ques.questionText,
                                      option.optionText
                                    );
                                  }}
                                />{" "}
                                {option.optionText}
                              </label>
                            ) : (
                              <label>
                                <input
                                  type={ques.questionType}
                                  name={j}
                                  value={option.optionText}
                                  className="form-check-input"
                                  required={ques.required}
                                  style={{
                                    margnLeft: "5px",
                                    marginRight: "5px",
                                  }}
                                  onChange={(e) => {
                                    selectinput(ques.questionText, e.target.value);
                                  }}
                                />{" "}
                                {option.optionText}
                              </label>
                            )
                          ) : (
                            <label>
                              <input
                                type={ques.questionType}
                                name={j}
                                value={option.optionText}
                                className="form-check-input"
                                required={ques.required}
                                style={{ margnLeft: "5px", marginRight: "5px" }}
                                onChange={() => {
                                  select(ques.questionText, option.optionText);
                                }}
                              />
                              {option.optionText}
                            </label>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            }
          })}

          <div className="user_form_submit">
            <Button
              variant="contained"
              color="primary"
              onClick={submit}
              style={{ fontSize: "14px" }}
            >
              Submit
            </Button>
          </div>

          <div className="user_footer">Real Time Survey</div>
        </div>
      </div>
    </div>
  );
};

export default UsersForm;
