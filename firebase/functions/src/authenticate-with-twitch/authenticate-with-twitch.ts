import * as corsFn from "cors";
import * as functions from "firebase-functions";
import getFirebaseAuthToken from "./get-firebase-auth-token";
import getTwitchAuthToken from "./get-twitch-auth-token";
import getTwitchUserInfo from "./get-twitch-user-info";

const cors = corsFn({ origin: true });

const authenticateWithTwitch = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { query } = req;
    const code = query.code as string;
    const { twitch: twitchConfig } = functions.config();
    const { id: clientId, secret: clientSecret } = twitchConfig;
    const callbackUrl = `${req.headers["origin"]}/callback`;

    if (!clientId || !clientSecret) {
      return res
        .status(500)
        .send(
          "Invalid server config, be sure to set the twitch env variables in the Firebase config"
        );
    }
    if (!code) {
      return res.status(406).send("Missing Code");
    }

    try {
      const authTokenConfig = { clientId, clientSecret, code, callbackUrl };
      const accessToken = await getTwitchAuthToken(authTokenConfig);
      const twitchUserInfo = await getTwitchUserInfo(accessToken, clientId);

      const firebaseId = `twitch:${twitchUserInfo.id}`;
      const token = await getFirebaseAuthToken(twitchUserInfo, firebaseId);

      return res.send(token);
    } catch (err) {
      functions.logger.error(err);
      /**
       * probably shouldn't actually send the error since it might contain information
       * that shouldn't be available to the client, I'm only doing it to make debugging
       * this tutorial easier
       */
      return res.status(500).send(err);
    }
  });
});

export default authenticateWithTwitch;
