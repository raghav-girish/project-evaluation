import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import CloseIcon from "@material-ui/icons/Close";


import {
  Button
} from "@material-ui/core";

const notistackRef = React.createRef();
const onClickDismiss = key => () => {
  notistackRef.current.closeSnackbar(key);
}

ReactDOM.render(
  <BrowserRouter>
    <SnackbarProvider
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
      ref={notistackRef}
      action={(key) => (
        <Button onClick={onClickDismiss(key)}>
          <CloseIcon
            style={{  color:"white" }}
          />
        </Button>
      )}
      preventDuplicate
    >
      <App />
    </SnackbarProvider>
  </BrowserRouter>,
  document.getElementById("root")
);


