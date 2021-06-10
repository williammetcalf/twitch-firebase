import { Box, Button, Container, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/Login";
import TwitchCallback from "./pages/TwitchCallback";
import firebase from "firebase/app";

function App() {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <BrowserRouter>
      <Container>
        <Typography>
          Status:{" "}
          {currentUser
            ? `Logged in as ${currentUser.displayName}`
            : "Unauthenticated"}
        </Typography>

        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30vh",
          }}
        >
          {currentUser && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => firebase.auth().signOut()}
            >
              Log out
            </Button>
          )}
          {!currentUser && (
            <Switch>
              <Route path="/" exact component={LoginPage} />
              <Route path="/callback" exact component={TwitchCallback} />
            </Switch>
          )}
        </Box>
      </Container>
    </BrowserRouter>
  );
}

export default App;
