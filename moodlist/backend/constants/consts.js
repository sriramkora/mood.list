const APP_PORT = "8080";
const APP_HOST = process.env.APP_HOST || 'http://localhost:' + APP_PORT;
const APP_HOST_FRONTEND = "http://moodlist-frontend.s3-website-us-east-1.amazonaws.com" //http://localhost:3000
const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientsecret = process.env.SPOTIFY_CLIENT_SECRET;
const spotifyAccountsHost = "https://accounts.spotify.com";
const spotifyApisHost = "https://api.spotify.com";
const spotifyAuthzScope = 'user-read-private user-read-email';
const accessKey =  process.env.AWS_ACCESS_KEY;
const accessSecret = process.env.AWS_SECRET_KEY;

module.exports = {
    APP_PORT,
    APP_HOST,
    APP_HOST_FRONTEND,
    spotifyClientId,
    spotifyClientsecret,
    spotifyAccountsHost,
    spotifyApisHost,
    spotifyAuthzScope,
    accessKey,
    accessSecret,
}