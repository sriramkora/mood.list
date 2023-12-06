const APP_PORT = "8080";
const APP_HOST = "http://localhost:" + APP_PORT;
const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientsecret = process.env.SPOTIFY_CLIENT_SECRET;
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