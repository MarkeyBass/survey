import React, { useState, useEffect } from "react";
import "./Mainbody.css";
import StorageIcon from "@material-ui/icons/Storage";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import { IconButton } from "@material-ui/core";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
// import Card from "./Card";
import axios from "axios";
import MoreVert from "@material-ui/icons/MoreVert";
import doc_image from "../../images/t-shirt.png";
import { useHistory } from "react-router-dom";

import { useStateValue } from "../../context/StateProvider";

import { actionTypes } from "../../context/reducer";

const useStyles = makeStyles({
  storageIcon: {
    fontSize: "16px",
    color: "black",
  },
});

function Mainbody() {
  const [files, setFiles] = useState([]);
  const classes = useStyles();
  const history = useHistory();
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get("http://localhost:9000/api/forms/all_ids_and_names");
        const namesandIdsRes = res.data;
        setFiles(namesandIdsRes);
        console.log({ namesandIdsRes });
      } catch (err) {
        console.log(err);
      }
    };
    fetchAll();
    // async function filenames() {
    //   const names_res = await axios.get("http://localhost:9000/api/get_all_filenames");
    //   let docFileIdNames = names_res.data.all_form_documents;

    //   let tempFiles = [];
    //   let tempDocNamesArr = [];

    //   console.log({ docNames: docFileIdNames });

    //   // Promise.all(
    //   docFileIdNames.forEach((docName) => {
    //     const id = docName.split(".")[0];
    //     async function data() {
    //       const res = await axios.get(`http://localhost:9000/api/questions/${id}`);
    //       // console.log({ id, data: res.data.form_data.documentName });
    //       tempFiles = [...tempFiles, res.data.form_data];
    //       tempDocNamesArr = [...tempDocNamesArr, res.data.form_data.documentName];
    //       console.log("tempDocNamesArr: ", tempDocNamesArr);
    //       setFiles(tempFiles);

    //       dispatch({
    //         type: actionTypes.SET_DOC_NAMES_ARRAY,
    //         documentNamesArray: tempDocNamesArr,
    //       });
    //     }
    //     data();
    //   });
    //   // );
    //   console.log({ tempFiles });
    // }
    // filenames();
  }, []);

  async function navigatTo(id) {
    dispatch({
      type: actionTypes.SET_DOC_NAME,
      documentId: id,
    });

    history.push(`/form/${id}`);
  }

  return (
    <div className="mainbody">
      <div className="main_top">
        <div className="main_top_left" style={{ fontSize: "16px", fontWeight: "500" }}>
          Recent forms
        </div>

        {/* <div className="main_top_right">
          <div className="main_top_center" style={{ fontSize: "14px", marginRight: "125px" }}>
            Owned by anyone <ArrowDropDownIcon />
          </div>
          <IconButton>
            <StorageIcon
              className={classes.storageIcon}
              style={{ fontSize: "16px", color: "black" }}
            />
          </IconButton>
          <IconButton>
            <FolderOpenIcon
              className={classes.storageIcon}
              style={{ fontSize: "16px", color: "black" }}
            />
          </IconButton>
        </div> */}
      </div>
      <div className="main_docs">
        {console.log(files)}
        {files.map((el) => (
          <div
            className="doc_card"
            key={el.documentId}
            onClick={() => navigatTo(el.documentId)}
            style={{ cursor: "pointer" }}
          >
            <img src={doc_image} alt="" className="doc_iamge" />

            <div className="doc_card_content">
              <h5 style={{ overFlow: "ellipsis" }}>
                {el ? (
                  <>
                    {/* <p>{el.documentId}</p>  */}
                    <p>{el.documentName}</p>
                  </>
                ) : (
                  " Untitled Doc"
                )}
                {/* {console.log(el.documentId, el.documentName)} */}
              </h5>
              <div className="doc_content" style={{ fontSize: "12px", color: "grey" }}>
                <div className="content_left">
                  <StorageIcon
                    style={{
                      colore: "white",
                      fontSize: "12px",
                      backgroundColor: "#6E2594",
                      padding: "3px",
                      marginRight: "3px",
                      borderRadius: "2px",
                    }}
                  />
                </div>
                <MoreVert style={{ fontSize: "16px", color: "grey" }} />
              </div>
            </div>
          </div>
        ))}
        {/* {files.map((el) => (
          <Card name={el} />
          ))}
        <Card /> */}
      </div>
    </div>
  );
}

export default Mainbody;
