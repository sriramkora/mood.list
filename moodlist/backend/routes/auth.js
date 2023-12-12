const express = require('express');
const fetch = require('node-fetch');
const qs = require("qs");

const { add, get } = require('../data/user');
const { isValidEmail, isValidText } = require('../util/validation');
const U = require('../util/auth');
const C = require('../constants/consts');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  const data = req.body;
  let errors = {};

  if (!isValidEmail(data.email)) {
    errors.email = 'Invalid email.';
  } else {
    try {
      const existingUser = await get(data.email);
      if (existingUser) {
        errors.email = 'Email exists already.';
      }
    } catch (error) { }
  }

  if (!isValidText(data.password, 6)) {
    errors.password = 'Invalid password. Must be at least 6 characters long.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'User signup failed due to validation errors.',
      errors,
    });
  }

  try {
    const createdUser = await add(data);
    const authToken = U.createJSONToken(createdUser.email);
    res
      .status(201)
      .json({ message: 'User created.', user: createdUser, token: authToken });
  } catch (error) {
    next(error);
  }
});

router.get('/login', async (req, res) => {
  let state = U.generateUUID();
  let scope = C.spotifyAuthzScope;
  let redirect_uri = C.APP_HOST + '/callback/spotifyAuthz';
  console.log(C.spotifyClientId);
  console.log(C.spotifyClientsecret);

  res.redirect(
    302,
    C.spotifyAccountsHost +
      "/authorize?" +
      qs.stringify({
        response_type: "code",
        client_id: C.spotifyClientId,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

router.get("/callback/spotifyAuthz", async (req, res) => {
  console.log("callback received");
  error = req.query.error;
  console.log("error: " + error);
  state = req.query.state;
  console.log("state: " + state);
  if (error != null) {
    res.status(401);
    res.send("Unable to Authenticate. Error: " + error);
  } else if (state === null) {
    res.status(400);
    res.send("State mismatch. Aborting");
  } else {
    code = req.query.code;
    let tokenResponse = await getAccessTokens(code);
    let jsonString = JSON.stringify(tokenResponse, null, 2); 
    console.log(jsonString);
    let userProfile = await getUserProfile(tokenResponse.access_token);
    console.log("userprofile :", userProfile);

    res.redirect("http://localhost:3000/?"+
    qs.stringify({
      access_token: tokenResponse.access_token,
      refresh_token: tokenResponse.refresh_token,
      expires_in: tokenResponse.expires_in,
      scope: tokenResponse.scope,
      id: userProfile.id,
      email: userProfile.email,
    }));
  }
});

async function getAccessTokens(authzCode) {
  let headers = new Headers(
    {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": U.getBasicAuthHeader()
    });

  let body = new URLSearchParams({
    "grant_type": "authorization_code",
    "code": authzCode,
    "redirect_uri": C.APP_HOST + '/callback/spotifyAuthz'
  });

  let reqOptions = {
    method: 'POST',
    headers: headers,
    body: body,
    redirect: 'follow'
  };

  let jsonResp = await
    fetch(C.spotifyAccountsHost + "/api/token", reqOptions)
      .then(res => res.json())
  // console.log("Response of API Token = ", jsonResp);
  return jsonResp;
}

async function getUserProfile(acsToken) {
  let headers = new fetch.Headers({
    Authorization: U.getOAuthHeader(acsToken),
  });

  let reqOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };

  let jsonResp = await fetch(C.spotifyApisHost + "/v1/me", reqOptions).then(
    (res) => res.json()
  );
  console.log("User Profile = ", jsonResp);
  return jsonResp;
}

module.exports = router;
