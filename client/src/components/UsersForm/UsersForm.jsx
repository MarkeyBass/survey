import { Button, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import uuid from "react-uuid";

import { useHistory } from "react-router-dom";

import "./UsersForm.css";
// import { useStateValue } from "../../context/StateProvider";

import axios from "axios";
const UsersForm = () => {
  // const [{ questions, documentName, documentDescription, documentId }, dispatch] = useStateValue();

  const history = useHistory();
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [documentName, setDocumentName] = useState("");
  const [documentDescription, setDocumentDescription] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    const form_id = history.location.pathname.split("/")[2];
    async function fetchSurvey() {
      try {
        const res = await axios.get(`http://localhost:9000/api/students_forms/${form_id}`);

        setQuestions(res.data.form_data.questions);
        setDocumentName(res.data.form_data.documentName);
        setDocumentDescription(res.data.form_data.documentDescription);
        console.log({ questions: res.data.form_data.questions });
        setDocumentId(res.data.form_data.documentId);

        const answersCopy = [...answers];
        const questionsCopy = [...res.data.form_data.questions];
        questionsCopy.map((question, index) => {
          answersCopy[index] = {
            questionText: question.questionText,
            questionIndex: index,
            questionType: question.questionType,
            answer: "",
            hidden: question.hidden,
          };
        });
        setAnswers(answersCopy);
      } catch (err) {
        if (err.response.status === 400) {
          history.push("/404");
        }
        console.log(err);
        console.log(err.response);
      }
    }
    fetchSurvey();

    // Function preventing multiple form submitions of a single anonymous user..
    function checkUser() {
      const sUser = JSON.parse(localStorage.getItem("sUser"));
      console.log(sUser);
      if (
        sUser === null ||
        typeof sUser !== "object" ||
        !sUser.user ||
        typeof sUser.user !== "string"
      ) {
        const storageObject = { user: uuid(), formsArr: [form_id] };
        localStorage.setItem("sUser", JSON.stringify(storageObject));
        setUser(storageObject.user);
      } else {
        const hasFormInStorage = sUser.formsArr.includes(form_id);
        console.log({ hasFormInStorage });
        if (!hasFormInStorage) sUser.formsArr.push(form_id);
        localStorage.setItem("sUser", JSON.stringify(sUser));
        setUser(sUser.user);
      }
    }
    checkUser();
  }, []);

  function answerInputHandler(value, questionType, index) {
    const answersCopy = [...answers];
    answersCopy[index].answer = value;
    answersCopy[index].questionType = questionType;
    setAnswers(answersCopy);
  }

  async function submit() {
    try {
      const res = await axios.post(`http://localhost:9000/api/students_forms/${documentId}`, {
        documentId,
        answers,
        documentName,
        documentDescription,
        usersId: user,
      });

      // console.log(res);
    } catch (err) {
      console.log(err);
    }

    // console.log(answers);

    history.push(`/submitted`);
  }

  return (
    <div className="submit" dir="rtl">
      <div className="user_form ">
        <div className="user_form_section">
          <div className="user_title_section">
            <Typography style={{ fontSize: "26px" }}>{documentName}</Typography>
            <Typography style={{ fontSize: "15px" }}>{documentDescription}</Typography>
          </div>

          {questions.map((question, i) => {
            if (!question.hidden) {
              return (
                <div className="user_form_questions " key={i}>
                  {/* {console.log(question.id)} */}
                  <Typography
                    className="questionText"
                    style={{
                      fontSize: "15px",
                      fontWeight: "400",
                      letterSpacing: ".1px",
                      lineHeight: "24px",
                      paddingBottom: "8px",
                      fontSize: "14px",
                    }}
                  >
                    {i + 1}. {question.questionText}
                  </Typography>
                  {question.options.map((option, j) => (
                    <div key={j} style={{ marginBottom: "5px" }}>
                      {/* {console.log(ques)} */}
                      <div style={{ display: "flex" }}>
                        <div className="form-check">
                          {question.questionType === "radio" && (
                            <label>
                              <input
                                type={question.questionType}
                                name={i}
                                // The value of the scale app is index (j) + 1
                                // It will make a 1-5 review
                                value={j + 1}
                                className="form-check-input"
                                required={question.required}
                                style={{
                                  margnLeft: "5px",
                                  marginRight: "5px",
                                }}
                                onChange={(e) => {
                                  answerInputHandler(e.target.value, question.questionType, i);
                                }}
                              />{" "}
                              {option.optionText}
                            </label>
                          )}
                          {question.questionType === "textarea" && (
                            <label>
                              <textarea
                                className="textarea"
                                rows="5"
                                cols="40"
                                name={i}
                                value={option.optionText}
                                className="form-check-input"
                                required={question.required}
                                style={{
                                  margnLeft: "5px",
                                  marginRight: "5px",
                                }}
                                onChange={(e) => {
                                  answerInputHandler(e.target.value, question.questionType, i);
                                }}
                              />{" "}
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
