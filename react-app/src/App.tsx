import { Box, Container } from "@material-ui/core";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/Login";
import TwitchCallback from "./pages/TwitchCallback";

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30vh",
          }}
        >
          <Switch>
            <Route path="/" exact component={LoginPage} />
            <Route path="/callback" exact component={TwitchCallback} />
          </Switch>
        </Box>
      </Container>
    </BrowserRouter>
  );
}

export default App;
