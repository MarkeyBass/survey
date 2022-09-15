export const initialState = {
  token: "",
  isAdminLoggedIn: false,
  login: (token) => {},
  logout: (token) => {},
  documentNamesArray: [],
  documentId: "",
  documentName: "Untitled Form",
  documentDescription: "Add Description",
  questions: [
    {
      questionText: "Question",
      questionType: "radio",
      options: [{ optionText: "Option 1" }],
      open: true,
      required: true,
      hidden: false,
    },
  ],
};

export const actionTypes = {
  ADMIN_LOGIN: "ADMIN_LOGIN",
  ADMIN_LOGOUT: "ADMIN_LOGOUT",
  SET_QUESTIONS: "SET_QUESTIONS",
  CHANGE_TYPE: "CHANGE_TYPE",
  SET_DOC_NAME: "SET_DOC_NAME",
  SET_DOC_DESC: "SET_DOC_DESC",
  SET_DOC_ID: "SET_DOC_ID",
  SET_DOC_NAMES_ARRAY: "SET_DOC_NAMES_ARRAY",
};

const reducer = (state, action) => {
  // console.log(action.type);

  switch (action.type) {
    case actionTypes.ADMIN_LOGIN:
      return {};
    case actionTypes.SET_ID:
      return {
        ...state,
        documentId: action.documentId,
      };
    case actionTypes.SET_QUESTIONS:
      // console.log(action.questions);
      return {
        ...state,
        questions: action.questions,
      };
    case actionTypes.CHANGE_TYPE:
      return {
        ...state,
        questionType: action.questionType,
      };
    case actionTypes.SET_DOC_NAME:
      return {
        ...state,
        documentName: action.documentName,
      };

    case actionTypes.SET_DOC_DESC:
      return {
        ...state,
        documentDescription: action.documentDescription,
      };
    case actionTypes.SET_DOC_NAMES_ARRAY:
      return {
        ...state,
        documentNamesArray: action.documentNamesArray,
      };
    default:
      return state;
  }
};

export default reducer;
