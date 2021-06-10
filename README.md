# Twitch + Firebase Authentication Demo

This project is a minimal demonstration of how to setup Firebase authentication using Twitch.tv as a custom auth provider (although the same concept should work with any standard OAuth2.0 auth provider).

## Local Setup

### Prerequisits

- node v12 (required for firebase-tools)
- installed [firebase-tools](https://www.npmjs.com/package/firebase-tools)
- logged into the firebase cli

### Installation

```
# Clone the repo
git@github.com:williammetcalf/twitch-firebase.git

# Install dependencies
cd firebase/functions
yarn
cd ../..
cd react-app
yarn
cd ..

# Initialize a firebase application (assuming you don't have one created)
firebase init
# ...???
```

- set firebase config variables

  ```
  firebase functions:config:set twitch.id="<twitch client id>" twitch.secret="<twitch client secret>"
  ```
