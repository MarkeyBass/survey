import React, { useState, useEffect } from "react";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import uuid from "react-uuid";
import axios from "axios";

import { useParams } from "react-router-dom";

import "./QuestionForm.css";

import { Button } from "@material-ui/core";
import QuestionsUI from "./QuestionUI";

// CONTEXT API
import { actionTypes } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";

import ErrorModal from "../UI/ErrorModal";

const QuestionForm = () => {
  const [questions, setQuestions] = useState([
    {
      id: uuid(),
      questionText: "Question text...",
      questionType: "radio",
      options: [
        { optionText: "כלל לא" },
        { optionText: "במידה מעטה" },
        { optionText: "במידה בינונית" },
        { optionText: "במידה רבה" },
        { optionText: "במידה רבה מאוד" },
      ],
      open: false,
      required: false,
      hidden: false,
    },
    {
      id: uuid(),
      questionText: "Question text...",
      questionType: "textarea",
      options: [{}],
      open: false,
      required: false,
      hidden: false,
    },
  ]);

  const [documentName, setDocumentName] = useState("Untitled Docment");
  const [documentDescription, setDocumentDescription] = useState("Add Description");

  const { form_id } = useParams();
  const [documentId, setDocumentId] = useState(form_id);

  const [formError, setFormError] = useState();

  const [{}, dispatch] = useStateValue();

  const errorDismissHandler = () => setFormError(undefined);

  function dispatchDocument(id, name, description, newQuestions) {
    dispatch({
      type: actionTypes.SET_DOC_ID,
      documentId: id,
    });
    dispatch({
      type: actionTypes.SET_DOC_NAME,
      documentName: name,
    });
    dispatch({
      type: actionTypes.SET_DOC_DESC,
      documentDescription: description,
    });
    dispatch({
      type: actionTypes.SET_QUESTIONS,
      questions: newQuestions,
    });
  }

  useEffect(() => {
    const getFormData = async () => {
      const res = await axios.get(`http://localhost:9000/api/forms/${form_id}`);

      const documentNameData = res.data.form_data.documentName;
      const documentDescriptionData = res.data.form_data.documentDescription;
      const questionsData = res.data.form_data.questions;

      setDocumentId(form_id);
      setDocumentName(documentNameData);
      setDocumentDescription(documentDescriptionData);
      setQuestions(questionsData);

      dispatchDocument(form_id, documentNameData, documentDescriptionData, questionsData);
    };
    getFormData();
  }, []);

  const commitToDB = async () => {
    try {
      const res = await axios.post(`http://localhost:9000/api/forms/${form_id}`, {
        documentName,
        documentDescription,
        questions,
        documentId: form_id,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
      console.log(err.response.data);
      if (err.response.data.errorCode === 10) {
        setFormError({
          msg: err.response.data.errorMsg,
          listOfTakenNames: err.response.data.listOfTakenNames,
        });
      } else if (err.message) {
        setFormError({ msg: err.message });
      } else if (err.request) {
        setFormError({ msg: err.request });
      }
    }
    // console.log(questions);

    dispatchDocument(form_id, documentName, documentDescription, questions);
  };

  // Drag And Drop Function
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    // const itemgg = [...questions];
    const orderedList = reorder(
      // itemgg,
      questions,
      result.source.index,
      result.destination.index
    );
    setQuestions(orderedList);
  };

  // Drag And Drop Function
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  return (
    <div>
      {formError && (
        <ErrorModal
          title={formError.msg}
          msg={formError.listOfTakenNames ? "List Of Taken Names: " : ""}
          onDismissErr={errorDismissHandler}
          list={formError.listOfTakenNames ? formError.listOfTakenNames : undefined}
        />
      )}
      <div className="question_form" dir="rtl">
        <br />
        <br />
        <div className="section">
          <div className="question_title_section">
            <div className="question_form_top">
              <input
                type="text"
                className="question_form_top_name"
                style={{ color: "black" }}
                placeholder="הוסף כותרת לסקר"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
              />
              <input
                type="text"
                className="question_form_top_desc"
                style={{ color: "black" }}
                placeholder="הוסף תיאור לסקר"
                value={documentDescription}
                onChange={(e) => setDocumentDescription(e.target.value)}
              />
            </div>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {/* MAIN COMPONENT ENVELOPED BY DRAG AND DROP */}
                  <QuestionsUI questions={questions} setQuestions={setQuestions} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div className="save_form">
            <Button variant="contained" onClick={() => commitToDB()} style={{ fontSize: "14px" }}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;
