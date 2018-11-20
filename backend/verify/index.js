const { OAuth2Client } = require('google-auth-library');
const { CLIENT_ID } = require('../constants/Client');


const client = new OAuth2Client(CLIENT_ID);

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  
  return ticket.getPayload();
}

module.exports = verify;