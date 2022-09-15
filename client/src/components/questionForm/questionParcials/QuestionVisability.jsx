import React from "react";

import { AccordionSummary, Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";

import { FiEdit3 } from "react-icons/fi";
import { TextareaAutosize } from "@material-ui/core";

const QuestionVisability = ({ ques, i, expanded }) => {
  return (
    <AccordionSummary
      aria-controls="panel1a-content"
      // id="panelia-header"
      id={`panel1a-header + ${ques.id}`}
      elevation={1}
      style={{ width: "100%" }}
    >
      {/* First Ternary Loading - Start */}
      {
        ques.id !== expanded && (
          <div className="saved_questions">
            <section
              style={{
                fontSize: "15px",
                fontWeight: "400p",
                letterSpacing: ".1px",
                lineHeight: "24px",
                paddingBottom: "8px",
                color: "black",
                display: "flex",
                flexDirection: "column",
              }}
            >
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
              <Button
                // variant="contained"
                size="small"
                style={{
                  textTransform: "none",
                  // background: "#6aa0f8",
                  color: "#002e79",
                  fontSize: "13px",
                  fontWeight: "800",
                  // padding: "4px 0 0 0",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <FiEdit3
                  style={{
                    fontSize: "1.2rem",
                    marginBottom: "8px ",
                    marginRight: "10px",
                  }}
                />
              </Button>
              {i + 1}. {ques.questionText}
            </section>
            {ques.options.map((op, j) => (
              <div key={j} style={{ marginBottom: "5px" }}>
                {/* {console.log(op)} */}
                <div>
                  {/* <FormControlLabel
                    className="add_question_body"
                    style={{
                      marginLeft: "5px",
                      marginBottom: "5px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      flexDirection: ques.questionType === "text" && "column-reverse",
                      alignItems: ques.questionType === "text" && "flex-start",
                    }}
                    control={
                      ques.questionType === "radio" ? (
                        <input
                          type={ques.questionType}
                          color="primary"
                          disabled
                          style={{
                            margin: ques.questionType !== "text" ? "0 3px 0 5px" : "5px 0 5px 0",
                          }}
                          required={ques.type}
                        />
                      ) : (
                        j === 0 && (
                          <TextareaAutosize
                            className="textarea_display"
                            disabled
                            style={{
                              margin: "10px",
                              maxWidth: "700px",
                              width: "100%",
                              height: "100px",
                              fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                              padding: "5px",
                              // "@media only screen and (max-width: 748px)": {
                              //   width: "inherit",
                              // },
                            }}
                          />
                        )
                      )
                    }
                    label={
                      ques.questionType === "radio" && (
                        <Typography
                          style={{
                            fontFamily: " Roboto,Arial,sans-serif",
                            fontSize: " 13px",
                            fontWeight: "400",
                            letterSpacing: ".2px",
                            lineHeight: "20px",
                            color: "#202124",
                          }}
                        >
                          {ques.options[j].optionText}
                        </Typography>
                      )
                    }
                  /> */}

                  <div
                    className="add_question_body"
                    style={{
                      marginLeft: "5px",
                      marginBottom: "5px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      flexDirection: ques.questionType === "text" && "column-reverse",
                      alignItems: ques.questionType === "text" && "flex-start",
                    }}
                  >
                    {ques.questionType === "radio" ? (
                      <input
                        name={i}
                        type={ques.questionType}
                        color="primary"
                        disabled
                        style={{
                          margin: ques.questionType !== "text" ? "0 3px 0 5px" : "5px 0 5px 0",
                        }}
                        required={ques.type}
                        // value={0}
                      />
                    ) : (
                      j === 0 && (
                        <TextareaAutosize
                          className="textarea_display"
                          // value={0}
                          disabled
                          style={{
                            margin: "10px",
                            maxWidth: "700px",
                            width: "100%",
                            height: "100px",
                            fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                            padding: "5px",
                            // "@media only screen and (max-width: 748px)": {
                            //   width: "inherit",
                            // },
                          }}
                        />
                      )
                    )}

                    {ques.questionType === "radio" && (
                      <Typography
                        style={{
                          fontFamily: " Roboto,Arial,sans-serif",
                          fontSize: " 13px",
                          fontWeight: "400",
                          letterSpacing: ".2px",
                          lineHeight: "20px",
                          color: "#202124",
                        }}
                      >
                        {j + 1}. {ques.options[j].optionText}
                      </Typography>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )

        // First Ternary Loading - End
      }
    </AccordionSummary>
  );
};

export default QuestionVisability;
