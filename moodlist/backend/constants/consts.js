const APP_PORT = "8080";
const APP_HOST = "http://localhost:" + APP_PORT;
const spotifyClientId = "acd2ac120e7c41bbb4f00f34aae4d018";//process.env.SPOTIFY_CLIENT_ID;
const spotifyClientsecret = "736aab0d929c4d669c9f5d4d3ee78598";//process.env.SPOTIFY_CLIENT_SECRET;
const spotifyAccountsHost = "https://accounts.spotify.com";
const spotifyApisHost = "https://api.spotify.com";
const spotifyAuthzScope = 'user-read-private user-read-email';

module.exports = {
    APP_PORT,
    APP_HOST,
    spotifyClientId,
    spotifyClientsecret,
    spotifyAccountsHost,
    spotifyApisHost,
    spotifyAuthzScope
}