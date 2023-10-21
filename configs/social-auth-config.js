const { OAuth2Client } = require('google-auth-library');
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "demodemodemo";

class SocialAuthConfig {

    googleAuth = () => new OAuth2Client(GOOGLE_CLIENT_ID);

}
module.exports = new SocialAuthConfig();