# Twitch + Firebase Authentication Demo

This project is a minimal demonstration of how to setup Firebase authentication using Twitch.tv as a custom auth provider (although the same concept should work with any standard OAuth2.0 auth provider).

## Local Setup

### Prerequisits

- node v12 (required for firebase-tools) with yarn installed
- installed [firebase-tools](https://www.npmjs.com/package/firebase-tools)
- logged into the firebase cli (with a credit card attached, as the Blaze plan is required)
- Twitch developer application created, with a client id/secret generated

### Installation

#### Clone the repo

```
git@github.com:williammetcalf/twitch-firebase.git
```

#### Install npm dependencies

```
cd twitch-firebase
cd firebase/functions
yarn
cd ../..
cd react-app
yarn
cd ..
```

#### Create Firebase app

```
cd firebase
firebase init
> Are you ready to proceed?
  > y
> Select Firebase features
  > Database
  > Functions
> Please select an option
  > Create a new project
> Please specify a unique name
  > your-firebase-app-name
> What would you like to call your project?
  > [enter]
> It seems you haven't initialized Realtime database. Do you want to set it up now?
  > [y]
  > [select your preferred region]
> What file should be used for Database Security Rules?
  > [enter]
> File database.rules.json already exists...?
  > [enter]
> What language would you like to write cloud functions?
  > [Typescript]
> Do you want to use ESLint
  > [n]
> File xxx already exists? Overwrite?
 > [n, dont overwrite any of the files]
> Do you want to install dependencies with npm now?
  > [n]
```

Now navigate to your [Firebase console](https://console.firebase.google.com/), select the project you just created, and update your payment plan to "Blaze" (pay as you go).

#### Deploy the Firebase functions

```
cd functions
firebase functions:config:set twitch.id="<your twitch client id>" twitch.secret="<your twitch client secret>"
# the next step will likely fail once or twice initially, just keep trying until it finishes
firebase deploy
```

#### Setup the frontend environment variables

Create a new file `./react-app/.env`, and copy in the following content

```
REACT_APP_TWITCH_CLIENT_ID=<twitch client id>

# Obtain your api url from the firebase console, or the output of the previous step
# Should look something like https://region-app-name.cloudfunctions.net
REACT_APP_BASE_API_URL=<base url for your firebase functions>

# Obtain the following values from your firebase app console
#   > Project Overview > Web > [enter some app name] > Register App
REACT_APP_FB_API_KEY=<firebase api key>
REACT_APP_FB_AUTH_DOMAIN=<firebase auth domain>
REACT_APP_FB_DB_URL=<firebase db url>
REACT_APP_FB_PROJECT_ID=<firebase project id>
REACT_APP_FB_STORAGE_BUCKET=<firebase storage bucket>
REACT_APP_FB_SENDER_ID=<firebase sender id>
REACT_APP_FB_APP_ID=<firebase app id>
```

#### Finalize Google Cloud setup

You should now be able to start the app with running the following command from the `/react-app` directory:

```
yarn start
```

Things should almost be working, but there are some google cloud configurations that need to be setup still. The easiest way is to try to use the webapp, and follow the instructions in the error messages.

- Open the web-browser developer console, and go to the network tab.
- Click the LOGIN WITH TWITCH button in the app
- Login...
- The request should fail, look at the error message in the network tab, if it says
  - `There is no configuration corresponding to the provided identifier.` > In the firebase console, click "Authentication" > "Get Started" > Try logging in again
  - `IAM Service Account Credentials API has not been used in project xxxx before or it is disabled. Enable it by visiting https://console.developers.google.com/apis/api/iamcredentials.googleapis.com/overview?project=xxxxx then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry.;` > Follow the link in the message and enable the api > Wait a few minutes (might take like, 30 minutes even)
- Yay! you should finally be done and the app should be running
