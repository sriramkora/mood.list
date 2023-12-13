import React, { useEffect, useState } from "react";
import classes from "../CSS/HomePage.module.css";
import { Navigate, useSearchParams, useNavigate } from "react-router-dom";
import { getAuthToken } from "../util/auth";

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const refresh_token = searchParams.get("refresh_token");
  //const expires_in = searchParams.get("expires_in");
  const scope = searchParams.get("scope");
  const userid = searchParams.get("id");
  const email = searchParams.get("email");
  const username = searchParams.get("username");
  const token = searchParams.get("access_token");
  const [textValue, setTextValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!getAuthToken() && token) {
      localStorage.setItem("token", token);
      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 1);
      localStorage.setItem("expiration", expiration.toISOString());
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("scope", scope);
      localStorage.setItem("userid", userid);
      localStorage.setItem("email", email);
      localStorage.setItem("username", username);

      console.log("token set!");

      window.location.reload();
    }
  }, [token]);

  if (!getAuthToken() && !token) {
    console.log("deleting token!");
    localStorage.removeItem("token");
    return <Navigate to="/auth" />;
  }

  const handleGenerateClick = () => {
    const playlists = JSON.stringify([
      {
        date: "Wed, Nov 1",
        weather: "Rainy",
        description: "Lorem ipsum...",
        embedLink:
          "https://open.spotify.com/embed/playlist/37nCSouvwoPLsM91nawryP?utm_source=generator",
      },
      {
        date: "Wed, Nov 1",
        weather: "Rainy",
        description: "Lorem ipsum...",
        embedLink:
          "https://open.spotify.com/embed/playlist/37nCSouvwoPLsM91nawryP?utm_source=generator",
      },
    ]);
    localStorage.setItem('text', textValue);
    console.log('text: ', localStorage.getItem('text'));
    localStorage.setItem('resultplaylists', playlists);
    console.log('playlists: ', localStorage.getItem('resultplaylists'));
    navigate('/result');
  };

  return (
    <div className={classes.homePage}>
      <div className={classes.overlapWrapper}>
        <div className={classes.overlap}>
          <div className={classes.group}>
            <div className={classes.overlapGroup}>
              <button
                className={classes.generateButton}
                onClick={handleGenerateClick}
              >
                Generate
              </button>
            </div>
          </div>
          <div className={classes.overlapGroupWrapper}>
            <textarea
              className={classes.input}
              placeholder="Please enter some text, such as a poem, song lyrics, or an essay. Max 500 words."
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
            />
          </div>
          <div className={classes.titleWrapper}>mood.list</div>
        </div>
      </div>
    </div>
  );
}
