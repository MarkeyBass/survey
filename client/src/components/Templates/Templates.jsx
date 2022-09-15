import React from "react";
import "./Templates.css";
import blank from "../../images/forms-blank-googlecolors.png";
// import party from "../../images/party_invite.png";
// import contact from "../../images/contact.png";
import { useHistory } from "react-router-dom";
import uuid from "react-uuid";
import { useStateValue } from "../../context/StateProvider";
import { actionTypes } from "../../context/reducer";

// import { IconButton } from "@material-ui/core";
// import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
function Templates() {
  const history = useHistory();
  const [{}, dispatch] = useStateValue();

  function createform() {
    const form_id = uuid();

    dispatch({
      type: actionTypes.SET_DOC_NAME,
      documentId: form_id,
    });
    history.push("/form/" + form_id);
  }
  return (
    <div className="template_section">
      <div className="template_top">
        <div className="template_left">
          <p style={{ color: "#202124", fontSize: "16px" }}>Start a new form</p>
        </div>
        {/* <div className="template_right">
          <div className="gallery_button">
            Template gallery
            <UnfoldMoreIcon fontSize="small" style={{ marginLeft: "15px" }} />
          </div>
          <IconButton style={{ marginLeft: "15px" }}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </div> */}
      </div>
      <div className="template_body">
        <div className="card" onClick={createform}>
          <img src={blank} className="card_image" style={{}} />
          <p className="title">Blank</p>
        </div>
        {/* <div className="card">
          <img src={party} className="card_image" style={{}} />
          <p className="title" style={{ fontSize: "small" }}>
            Party Invite
          </p>
        </div>
        <div className="card">
          <img src={contact} className="card_image" style={{}} />
          <p className="title" style={{ fontSize: "small" }}>
            Contact Information
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default Templates;
