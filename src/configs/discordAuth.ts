const REDIRECT_URI = process.env.REDIRECT_URI || 'https%3A%2F%2Fauth.expo.io%2F%40syri_cotocs%2Fgameplayreact-native';
const SCOPE = process.env.SCOPE || 'identify%20connections%20email%20guilds';
const RESPONSE_TYPE = process.env.RESPONSE_TYPE || 'token';
const CLIENT_ID = process.env.CLIENT_ID || '925579035755577374';
const CDN_IMAGE = process.env.CDN_IMAGE || 'https://cdn.discordapp.com';

export {
    CDN_IMAGE,
    SCOPE,
    RESPONSE_TYPE,
    REDIRECT_URI,
    CLIENT_ID
}