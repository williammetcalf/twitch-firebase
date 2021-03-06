import { Button } from "@material-ui/core";
import React, { FC } from "react";

const LoginPage: FC = () => {
  // see https://dev.twitch.tv/docs/authentication/getting-tokens-oidc/#oidc-authorization-code-flow
  const twitchAuthUrl =
    "https://id.twitch.tv/oauth2/authorize?" +
    `client_id=${process.env.REACT_APP_TWITCH_CLIENT_ID}&` +
    `redirect_uri=${window.location.origin}/callback&` +
    "response_type=code&" +
    "scope=openid&" +
    "claim=preferred_username";

  return (
    <a href={twitchAuthUrl} style={{ textDecoration: "none" }}>
      <Button color="primary" variant="contained">
        Login With Twitch
      </Button>
    </a>
  );
};

export default LoginPage;
