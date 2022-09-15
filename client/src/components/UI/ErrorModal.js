import React from "react";
import ReactDOM from "react-dom";

import Card from "./Card";
import Button from "./Button";
import styles from "./ErrorModal.module.css";
import { mergeClasses } from "@material-ui/styles";

// The first two components used only in this file in order to send them to
// different location in the DOM using ReactDom.createPortal()

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onDismissErr} />;
};

const ModalOverlay = (props) => {
  return (
    <Card className={styles.modal}>
      <header className={styles.header}>
        <h2>{props.title}</h2>
      </header>

      {props.list && (
        <div className={styles.actions}>
          <Button onClick={props.onDismissErr} className={styles.btn}>
            Back to form
          </Button>
        </div>
      )}
      {props.msg && (
        <div className={styles.content}>
          <p>{props.msg}</p>
        </div>
      )}
      {props.list && (
        <div className={styles.list}>
          <ul dir="rtl">
            {props.list &&
              props.list.map((item) => {
                return <li key={item}>{item}</li>;
              })}
          </ul>
        </div>
      )}
      <footer className={styles.actions}>
        <Button onClick={props.onDismissErr} className={styles.btn}>
          Back to form
        </Button>
      </footer>
    </Card>
  );
};

const ErrorModal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onDismissErr={props.onDismissErr} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          msg={props.msg}
          onDismissErr={props.onDismissErr}
          list={props.list}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default ErrorModal;
