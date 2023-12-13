import React from "react";
import classes from "../CSS/AccountPage.module.css";

export default function AccountPage() {
  // Sample data from the backend
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
  return (
    <div className={classes.accountPage}>
      <div className={classes.div}>
        <div className={classes.overlap}>
          <img
            className={classes.rectangle}
            alt="Rectangle"
            src="rectangle-1.svg"
          />
          <div className={classes.headerRect} />
          <div className={classes.textWrapper}>mood.list</div>
          {/* <div className={classes.group}>
            <div className={classes.cartButton}>
              <div className={classes.logoutButton}>Log out</div>
            </div>
          </div> */}
          <p className={classes.playlists}>
            <span className={classes.span}> {user.numPlaylists} </span>
            <span className={classes.textWrapper3}>
              Playlists
              <br />
              Joined{" "}
            </span>
            <span className={classes.span}>{user.joined}</span>
          </p>
          <div className={classes.textWrapper4}>Playlists</div>
          <div className={classes.textWrapper5}>{user.username}</div>
          <div className={classes.ellipse} />
          {playlists.map((playlist, index) => (
            <div className={classes.overlapWrapper} key={index}>
              <div className={classes.overlapGroup1}>
                <p className={classes.PlaylistInfo}>
                  <span className={classes.textWrapper6}>
                    {playlist.date}
                    <br />
                  </span>
                  <span className={classes.textWrapper7}>
                    Weather: {playlist.weather}
                    <br />
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
