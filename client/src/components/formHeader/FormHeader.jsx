import React from "react";
import form_image from "../../images/google-forms-new-logo-1.png";
import "./FormHeader.css";
// import { FiStar } from "react-icons/fi";
import { FiSettings } from "react-icons/fi";
import { AiOutlineEye } from "react-icons/ai";
import { IconButton } from "@material-ui/core";
import avatarimage from "../../images/avatar.jpg";
// import { IoMdFolderOpen } from "react-icons/io";

// import ColorLensIcon from "@material-ui/icons/ColorLens";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
// import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

import { useHistory } from "react-router-dom";
// import MoreVert from "@material-ui/icons/MoreVert";
// import AlertDialog from "./Alert";
import { useStateValue } from "../../context/StateProvider";
import { actionTypes } from "../../context/reducer";

const FormHeader = () => {
  const history = useHistory();
  const [{ documentName, documentId }, dispatch] = useStateValue();

  function setDocumentTitle(doc_name) {
    dispatch({
      type: actionTypes.SET_DOC_NAME,
      documentName: doc_name,
    });
  }

  function redirectToUsersForm() {
    const form_id = history.location.pathname.split("/")[2];
    history.push(`/response/${form_id}`);
  }

  return (
    <div className="form_header">
      <div className="form_header_left">
        <img src={form_image} style={{ height: "45px", width: "40px" }} />
        <input
          type="text"
          placeholder={documentName || "untitled document"}
          className="form_name"
          value={documentName || ""}
          onChange={(e) => setDocumentTitle(e.target.value)}
        />
        {/* <IoMdFolderOpen
          className="form_header_icon"
          style={{ marginRight: "10px" }}
        ></IoMdFolderOpen>
        <FiStar className="form_header_icon" style={{ marginRight: "10px" }} />
        <span style={{ fontSize: "12px", fontWeight: "600px" }}>All changes saved in Drive</span> */}
      </div>
      <div className="form_header_right">
        {/* <IconButton>
          <ColorLensIcon size="small" className="form_header_icon" />
        </IconButton> */}
        <IconButton onClick={redirectToUsersForm}>
          <AiOutlineEye className="form_header_icon" />
        </IconButton>
        {/* <Button variant="contained" color="primary" href="#contained-buttons">
          Send
        </Button> */}
        <IconButton>
          <FiSettings className="form_header_icon" />
        </IconButton>
        {/* <IconButton>
          <MoreVert className="form_header_icon" />
        </IconButton> */}
        <IconButton>
          <Avatar style={{ height: "30px", width: "30px" }} src={avatarimage} />
        </IconButton>
      </div>
    </div>
  );
};

export default FormHeader;
