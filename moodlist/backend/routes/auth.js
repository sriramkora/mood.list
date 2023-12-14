const express = require("express");
const fetch = require("node-fetch");
const qs = require("qs");
const logger = require('pino')()

const { add, get } = require("../data/user");
const { isValidEmail, isValidText } = require("../util/validation");
const U = require("../util/auth");
const C = require("../constants/consts");
const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
  accessKeyId: C.accessKey,
  secretAccessKey: C.accessSecret,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const router = express.Router();

router.post("/signup", async (req, res, next) => {
  const data = req.body;
  let errors = {};

  if (!isValidEmail(data.email)) {
    errors.email = "Invalid email.";
  } else {
    try {
      const existingUser = await get(data.email);
      if (existingUser) {
        errors.email = "Email exists already.";
      }
    } catch (error) { }
  }

  if (!isValidText(data.password, 6)) {
    errors.password = "Invalid password. Must be at least 6 characters long.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "User signup failed due to validation errors.",
      errors,
    });
  }

  try {
    const createdUser = await add(data);
    const authToken = U.createJSONToken(createdUser.email);
    res
      .status(201)
      .json({ message: "User created.", user: createdUser, token: authToken });
  } catch (error) {
    next(error);
  }
});

router.get("/login", async (req, res) => {
  logger.debug('/login called')
  let state = U.generateUUID();
  let scope = C.spotifyAuthzScope;
  let redirect_uri = C.APP_HOST + "/callback/spotifyAuthz";
  logger.debug(C.spotifyClientId);
  logger.debug(C.spotifyClientsecret);

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
  logger.debug("callback received");
  error = req.query.error;
  logger.debug("error: " + error);
  state = req.query.state;
  logger.debug("state: " + state);
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
    logger.debug(jsonString);
    let userProfile = await getUserProfile(tokenResponse.access_token);
    logger.debug("userprofile :" + userProfile);

    const putUserParams = {
      TableName: "user",
      Item: {
        userid: userProfile.id,
        username: userProfile.display_name,
        accesstoken: tokenResponse.access_token,
        authorizationcode: code,
        refreshtoken: tokenResponse.refresh_token,
        expiresat: Math.floor(Date.now() / 1000) + 3600,
      },
    };

    dynamoDB.put(putUserParams, (error, data) => {
      if (error) {
        console.error("Error saving user data:", error);
      } else {
        logger.info("user data saved successfully:" + data);
      }
    });

    res.redirect(
      C.APP_HOST_FRONTEND +
      "/?" +
      qs.stringify({
        access_token: tokenResponse.access_token,
        refresh_token: tokenResponse.refresh_token,
        expires_in: tokenResponse.expires_in,
        scope: tokenResponse.scope,
        id: userProfile.id,
        email: userProfile.email,
        username: userProfile.display_name,
      })
    );
  }
});

async function getAccessTokens(authzCode) {
  let headers = new fetch.Headers({
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: U.getBasicAuthHeader(),
  });

  let body = new URLSearchParams({
    grant_type: "authorization_code",
    code: authzCode,
    redirect_uri: C.APP_HOST + "/callback/spotifyAuthz",
  });

  let reqOptions = {
    method: "POST",
    headers: headers,
    body: body,
    redirect: "follow",
  };

  let jsonResp = await fetch(
    C.spotifyAccountsHost + "/api/token",
    reqOptions
  ).then((res) => res.json());
  // logger.debug("Response of API Token = " + jsonResp);
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

  let jsonResp = await fetch(C.spotifyApisHost + "/v1/me", reqOptions)
    .then(
      async (res) => {
        return await res.json()
      }
    )
    .catch(err => {
      logger.error("Caught error when calling /v1/me : " + err);
    })
  logger.info("User Profile = " + JSON.stringify(jsonResp));
  return jsonResp;
}

router.post("/getKeywords", async (req, res) => {
  const data = req.body;
  logger.debug(data.message);
  res.status(200).json({
    message: "fire happy flower smooth",
  });
});

router.post("/fetchPlaylists", async (req, res) => {
  const data = req.body;
  const searchQuery = data.message.replace(/ /g, "%2520");

  logger.debug("searchQuery: " + searchQuery);
  logger.debug("accessToken: " + data.accessToken);

  const apiUrl = `https://api.spotify.com/v1/search?q=${searchQuery}&type=playlist&limit=5`;

  fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${data.accessToken}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const dateOptions = {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      };
      const formattedDate = new Intl.DateTimeFormat(
        "en-US",
        dateOptions
      ).format(new Date());
      const playlists = data.playlists.items.map((item) => ({
        date: formattedDate,
        description: item.name,
        embedLink:
          "https://open.spotify.com/embed/playlist/" +
          item.id +
          "?utm_source=generator",
      }));

      logger.debug("playlists: " + JSON.stringify(playlists));
      res.status(200).json({
        message: JSON.stringify(playlists),
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

router.post("/putPlaylist", async (req, res) => {
  const data = req.body;
  logger.debug(data.userid);
  logger.debug(data.embedlink);
  const putplaylistParams = {
    TableName: "playlists",
    Item: {
      userid: data.userid,
      embedlink: data.embedlink,
      date: data.date,
      text: data.text,
      description: data.description,
    },
  };

  dynamoDB.put(putplaylistParams, (error, data) => {
    if (error) {
      logger.error("Error saving playlist data:" + error);
    } else {
      logger.info("playlist data saved successfully:" + data);
    }
  });

  res.status(200).json({
    message: "Playlist saved successfully!",
  });
});

router.post("/getAccount", async (req, res) => {
  const data = req.body;
  logger.debug(data.userid);
  const queryAccountParams = {
    TableName: "playlists",
    KeyConditionExpression: "userid = :userid",
    ExpressionAttributeValues: {
      ":userid": data.userid,
    },
  };

  dynamoDB.query(queryAccountParams, (error, data) => {
    if (error) {
      console.error("Error querying data:", error);
    } else {
      logger.info("Account data queried successfully:" + data.Items);
      res.status(200).json({
        playlists: JSON.stringify(data.Items),
        numPlaylists: data.Items.length.toString(),
      });
    }
  });


});

module.exports = router;
