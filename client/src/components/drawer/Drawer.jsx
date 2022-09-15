import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";

import { IconButton, ListItemText } from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import { FiSettings } from "react-icons/fi";
import { BsQuestionCircle } from "react-icons/bs";
import formimage from "../../images/forms_2020q4_48dp.png";

import excelsheetimage from "../../images/google-sheets.png";

import docimage from "../../images/google-docs--v1.png";

import slidesimage from "../../images/google-slides.png";
import driveimage from "../../images/google-drive--v1.png";
import rtLogo from "../../images/RTLogo.png";

const useStyles = makeStyles({
  logoLeters: {
    fontWeight: "700",
    fontSize: "22px",
    fontFamily: "'Product Sans',Arial,sans-serif",
  },
  list: {
    width: 250,
  },
  ListItemWraper: {
    marginLeft: "15px",
    marginRight: "10px",
    "&:hover": {
      backgroundColor: "#f4f4f9",
      borderRadius: "0 20px 20px 0",
    },
  },
  listItem: {
    marginLeft: "15px",
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "grey",
    "&:hover": {
      color: "black",
    },
  },

  slideImages: {
    height: "25px",
    width: "25px",
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();

  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const list = (ancor) => {
    return (
      <div style={{ width: "250px" }} role="presentation">
        <List>
          <ListItem
            style={{
              padding: "4px 0",
              width: "50px",
              height: "50px",
              margin: "20px 20px 0 20px",
            }}
          >
            <img
              src={rtLogo}
              alt="NotFound"
              className={classes.slideImages}
              style={{ width: "3rem", height: "3rem" }}
            />
            <span
              style={{
                marginLeft: "30px",
                color: "#5f6368",
                fontWeight: "500",
                fontSize: "22px",
                fontFamily: "'Product Sans',Arial,sans-serif",
              }}
            >
              {" "}
              Docs
            </span>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem className={classes.ListItemWraper}>
            <img src={docimage} alt="NotFound" className={classes.slideImages} />
            <div className={classes.listItem}> Docs</div>
          </ListItem>
          <ListItem className={classes.ListItemWraper}>
            <img src={excelsheetimage} alt="NotFound" className={classes.slideImages} />

            <div className={classes.listItem}> Sheets</div>
          </ListItem>
          <ListItem className={classes.ListItemWraper}>
            <img src={slidesimage} alt="NotFound" className={classes.slideImages} />
            <div className={classes.listItem}> Slides</div>
          </ListItem>
          <ListItem className={classes.ListItemWraper}>
            <img src={formimage} alt="NotFound" className={classes.slideImages} />
            <div className={classes.listItem}> Forms</div>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem className={classes.ListItemWraper}>
            <FiSettings />
            <div className={classes.listItem}> Settings</div>
          </ListItem>
          <ListItem className={classes.ListItemWraper}>
            <BsQuestionCircle />
            <div className={classes.listItem}> Help & Feedback</div>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem className={classes.ListItemWraper}>
            <img src={driveimage} alt="NotFound" className={classes.slideImages} />
            <div className={classes.listItem}> Drive</div>
          </ListItem>
        </List>
        <Divider />
      </div>
    );
  };

  return (
    <div>
      <React.Fragment key={"left"}>
        <IconButton onClick={toggleDrawer("left", true)}>
          <MenuIcon />
        </IconButton>
        <Drawer anchor={"left"} open={state["left"]} onClose={toggleDrawer("left", false)}>
          {list("Left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
