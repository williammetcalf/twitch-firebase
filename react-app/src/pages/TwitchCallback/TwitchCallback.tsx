import { Box, CircularProgress, Typography } from "@material-ui/core";
import axios from "axios";
import firebase from "firebase/app";
import { useSnackbar } from "notistack";
import React, { FC, useEffect, useMemo } from "react";
import { Redirect, useHistory, useLocation } from "react-router";

const TwitchCallback: FC = () => {
  // should now be at step #2 of https://dev.twitch.tv/docs/authentication/getting-tokens-oidc/#oidc-authorization-code-flow
  const { enqueueSnackbar } = useSnackbar();
  const { replace } = useHistory();

  // parse the code out of the URL
  const { search } = useLocation();
  const code = useMemo(() => {
    const url = new URLSearchParams(search.replace("?", ""));
    return url.get("code");
  }, [search]);

  useEffect(() => {
    if (code) {
      /**
       * To proceed with the authentication, the twitch client secret is needed. Since the client secret is,
       * well, secret... this part cannot be securely done from the webapp. We will continue by sending the code
       * returned by Twitch to our own private api. Since the example is for Firebase, I am using a
       * Firebase Function for simplicity.
       */
      const firebaseAuthUrl = `${process.env.REACT_APP_BASE_API_URL}/authenticateWithTwitch?code=${code}`;
      axios
        .get<string>(firebaseAuthUrl)
        .then(async ({ data: token }) => {
          await firebase.auth().signInWithCustomToken(token);
          enqueueSnackbar("Succesfully authenticated with Twich!", {
            variant: "success",
          });
        })
        .catch((err) => {
          console.error(err);
          enqueueSnackbar("Authentication Failed :(", {
            variant: "error",
          });
        })
        .finally(() => {
          replace("/");
        });
    }
  }, [code, replace, enqueueSnackbar]);

  if (!code) return <Redirect to="/" />;

  return (
    <Box style={{ textAlign: "center" }}>
      <Typography variant="h5">Auth Code from Twitch:</Typography>
      <Typography variant="h6">{code}</Typography>
      <br />
      <>
        <Typography>...Authenticating with Firebase...</Typography>
        <CircularProgress />
      </>
    </Box>
  );
};

export default TwitchCallback;
