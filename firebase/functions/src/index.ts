import * as admin from "firebase-admin";

admin.initializeApp();

export { default as authenticateWithTwitch } from "./authenticate-with-twitch";
