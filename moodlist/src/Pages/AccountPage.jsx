import React from "react";
import classes from "../CSS/AccountPage.module.css";
import {useNavigate } from "react-router-dom";

export default function AccountPage() {
  const navigate = useNavigate();
  const playlists = [
    {
      date: "Wed, Nov 1",
      weather: "Rainy",
      description: "Lorem ipsum...",
      embedLink:
        "https://open.spotify.com/embed/playlist/37nCSouvwoPLsM91nawryP?utm_source=generator",
    },
  ];

  const user = {
    username: "username",
    numPlaylists: 2,
    joined: "Nov 1, 2023",
  };

  const handlePlaylistClick = (playlist) => {
    const playlistsArray = [
      {
        date: playlist.date,
        weather: playlist.weather,
        description: playlist.description,
        embedLink: playlist.embedLink,
      }
    ];
    console.log("Clicked playlist:", JSON.stringify(playlistsArray));
    localStorage.setItem("resultplaylists", JSON.stringify(playlistsArray));
    navigate("/result");
  };

  return (
    <div className={classes.accountPage}>
      <div className={classes.div}>
        <div className={classes.overlap}>
          <p className={classes.playlists}>
            <span className={classes.span}> {user.numPlaylists} </span>
            <span className={classes.textWrapper3}> Playlists </span>
          </p>
          <div className={classes.textWrapper4}>Playlists</div>
          <div className={classes.textWrapper5}>{user.username}</div>
          <div className={classes.ellipse} />
          {playlists.map((playlist, index) => (
            <div className={classes.overlapWrapper} key={index}>
              <div className={classes.overlapGroup1}>
                <button
                  className={classes.PlaylistButton}
                  onClick={() => handlePlaylistClick(playlist)}
                >
                  View Playlist
                </button>
                <p className={classes.PlaylistInfo}>
                  <span className={classes.textWrapper6}>
                    {playlist.date}
                    <br />
                  </span>
                  <span className={classes.textWrapper7}>
                    {playlist.description}
                  </span>
                </p>
                <div className={classes.rectangle3} />
              </div>
            </div>
          ))}
        </div>
        <div className={classes.divWrapper}>
          <div className={classes.overlapGroup2}>
            <div className={classes.rectangle5} />
            <div className={classes.playlist}>New Playlist</div>
          </div>
        </div>
      </div>
    </div>
  );
}
