import { Box, CircularProgress, Typography } from "@material-ui/core";
import axios from "axios";
import React, { FC, useEffect, useMemo, useState } from "react";
import { Redirect, useLocation } from "react-router";

const TwitchCallback: FC = () => {
  // should now be at step #2 of https://dev.twitch.tv/docs/authentication/getting-tokens-oidc/#oidc-authorization-code-flow
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string>();

  // parse the code out of the URL
  const { search } = useLocation();
  const code = useMemo(() => {
    const url = new URLSearchParams(search.replace("?", ""));
    return url.get("code");
  }, []);

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
        .then(({ data }) => setToken(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [code]);

  if (!code) return <Redirect to="/" />;

  return (
    <Box style={{ textAlign: "center" }}>
      <Typography variant="h5">Auth Code from Twitch:</Typography>
      <Typography variant="h6">{code}</Typography>
      <br />
      {loading && (
        <>
          <Typography>...Authenticating with Firebase...</Typography>
          <CircularProgress />
        </>
      )}
      {token && (
        <>
          <Typography>Firebase auth token succesfully retrieved!</Typography>
          <Typography>{token}</Typography>
        </>
      )}
    </Box>
  );
};

export default TwitchCallback;
