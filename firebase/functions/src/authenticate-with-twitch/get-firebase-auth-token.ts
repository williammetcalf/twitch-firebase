import { TwitchUser } from "./get-twitch-user-info";
import * as admin from "firebase-admin";

async function getFirebaseAuthToken(
  twitchUser: TwitchUser,
  firebaseId: string
) {
  const displayName = twitchUser.display_name;
  try {
    // update the firebase user, the Twitch displayName may have changed
    await admin.auth().updateUser(firebaseId, { displayName });
  } catch (updateErr) {
    // if an error is thrown, that means the user does not already exist and must be created
    await admin.auth().createUser({ uid: firebaseId, displayName });
  }

  // optional: store the twitch user data in the firebase database
  admin.database().ref(`/user/${firebaseId}`).set(twitchUser);

  // this token is what the frontend application can actually authenticate with
  return admin.auth().createCustomToken(firebaseId);
}

export default getFirebaseAuthToken;
