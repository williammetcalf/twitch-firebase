import axios from "axios";

export interface TwitchUser {
  id: string;
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
  email?: string; //requires user:read:email scope
  created_at: string;
}
const twitchUserEndpoint = "https://api.twitch.tv/helix/users";

async function getTwitchUserInfo(accessToken: string, clientId: string) {
  // see https://dev.twitch.tv/docs/api/reference#get-users
  const { data } = await axios.get<{ data: TwitchUser[] }>(twitchUserEndpoint, {
    headers: {
      "Client-ID": clientId,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!data.data.length) {
    throw new Error(
      `Invalid user, or something, idk... here's the response: ${JSON.stringify(
        data
      )}`
    );
  }

  return data.data[0];
}

export default getTwitchUserInfo;
