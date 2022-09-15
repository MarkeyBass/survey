// TODO:This file is not in use right now

import { createContext, useReducer } from "react";
import reducer from "./reducer";

const INITIAL_STATE = {
  documentId: "",
  documentName: "Untitled Form",
  documentDescription: "Add Description",
  questions: [
    {
      questionText: "Question",
      questionType: "radio",
      options: [{ optionText: "Option 1" }],
      open: true,
      required: false,
      id: uuid(),
    },
  ],
};

export const FormContext = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <FormContext.Provider
      value={{
        dispatch,
        documentId: state.documentId,
        documentName: state.documentName,
        documentDescription: state.documentDescription,
        questions: state.questions,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
