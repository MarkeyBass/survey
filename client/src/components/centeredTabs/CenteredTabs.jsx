import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { Tabs } from "@material-ui/core";
import { Tab } from "@material-ui/core";

import PropTypes from "prop-types";
import { Switch } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import QuestionForm from "../questionForm/QuestionForm";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  tabs: {
    height: 10,
  },
  tab: {
    fontSize: 12,
    color: "#5f6968",
    textTransform: "capitalize",
    height: 10,
    fontWeight: "600",
    fontFamily: "Google Sans, Robato, Arial, sans-serif",
  },
});

// Inner conponent to execute the tab-panel content inside the tab-panel
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tab"
      hidden={value !== index}
      id={`simple_tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function allyProps(index) {
  return {
    id: `simple_tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const CenteredTabs = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      {/* Here the panels are defined */}
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabs}
        textColor="primary"
        indicatecolor="primary"
        centered
        value={0}
      >
        <Tab className={classes.Tab} label="Questions" {...allyProps(0)}></Tab>
        <Tab className={classes.Tab} label="Responses" {...allyProps(1)}></Tab>
      </Tabs>

      {/* Here the content of panels is defined */}
      <TabPanel value={value} index={0}>
        <QuestionForm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="submit" style={{ height: "76vh" }}>
          <div className="user_form">
            <div className="user_form_section">
              <div
                className="user_form_questions"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "20ox",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    style={{
                      fontSize: "15px",
                      fontWeight: "400",
                      letterSpacing: ".1px",
                      lineHeight: "24px",
                      paddingBottom: "8px",
                      fontSize: "24px",
                    }}
                  >
                    3 Responses
                  </Typography>
                </div>
                <IconButton>
                  <MoreVertIcon className="form_header_icon" />
                </IconButton>
              </div>
            </div>
            <br></br>
            <div style={{ marginBottom: "5px" }}>
              <div
                style={{
                  display: "flex",
                  fontSize: "12px",
                  justifyContent: "flex-end",
                }}
              >
                Accepting responses <Switch color="primary" size="small" />
              </div>
            </div>
            <div className="user_footer">Google Forms</div>
          </div>
        </div>
      </TabPanel>
    </Paper>
  );
};

export default CenteredTabs;
