import axios from "axios";

interface TwitchTokenResponse {
  access_token: string;
  expires_in: number;
  id_tokeN: string;
  refresh_token: string;
  scope: string[];
  token_type: string;
}
async function getTwitchAuthToken(config: {
  clientId: string;
  clientSecret: string;
  code: string;
  callbackUrl: string;
}) {
  const twitchUrl =
    "https://id.twitch.tv/oauth2/token?" +
    `client_id=${config.clientId}&` +
    `client_secret=${config.clientSecret}&` +
    `code=${config.code}&` +
    "grant_type=authorization_code&" +
    `redirect_uri=${config.callbackUrl}`;

  const { data } = await axios.post<TwitchTokenResponse>(twitchUrl);

  return data.access_token;
}

export default getTwitchAuthToken;
