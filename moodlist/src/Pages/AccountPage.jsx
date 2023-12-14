import React, { useEffect, useState } from "react";
import classes from "../CSS/AccountPage.module.css";
import { useNavigate, useS } from "react-router-dom";

export default function AccountPage() {
  const navigate = useNavigate();
  // const playlists = [
  //   {
  //     date: "Wed, Nov 1",
  //     description: "Lorem ipsum...",
  //     embedLink:
  //       "https://open.spotify.com/embed/playlist/37nCSouvwoPLsM91nawryP?utm_source=generator",
  //   },
  //   {
  //     date: "Wed, Nov 1",
  //     description: "Lorem ipsum...",
  //     embedLink:
  //       "https://open.spotify.com/embed/playlist/37nCSouvwoPLsM91nawryP?utm_source=generator",
  //   },
  //   {
  //     date: "Wed, Nov 1",
  //     description: "Lorem ipsum...",
  //     embedLink:
  //       "https://open.spotify.com/embed/playlist/37nCSouvwoPLsM91nawryP?utm_source=generator",
  //   },
  //   {
  //     date: "Wed, Nov 1",
  //     description: "Lorem ipsum...",
  //     embedLink:
  //       "https://open.spotify.com/embed/playlist/37nCSouvwoPLsM91nawryP?utm_source=generator",
  //   },
  // ];

  // const user = {
  //   username: "username",
  //   numPlaylists: 2,
  //   joined: "Nov 1, 2023",
  // };

  const [numPlaylists, setNumPlaylists] = useState('');
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const getAccountData = async () => {
      try {
        console.log("sending getAccount req");
        const response = await fetch(process.env.REACT_APP_HOST + "/getAccount", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userid: localStorage.getItem('userid')
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setNumPlaylists(data.numPlaylists);
          setPlaylists(JSON.parse(data.playlists));
        } else {
          console.error("getAccount API request failed with status:", response.status);
        }
      } catch (error) {
        console.error("An error occurred during the API request:", error);
      }
    };

    getAccountData();
  }, []); 

  const handlePlaylistClick = (playlist) => {
    const playlistsArray = [
      {
        date: playlist.date,
        description: playlist.description,
        embedLink: playlist.embedlink,
      },
    ];
    console.log("Clicked playlist:", JSON.stringify(playlistsArray));
    localStorage.setItem("resultplaylists", JSON.stringify(playlistsArray));
    localStorage.setItem('text', playlist.text);
    navigate("/result");
  };

  return (
    <div className={classes.accountPage}>
      <div className={classes.div}>
        <div className={classes.overlap}>
          <p className={classes.playlists}>
            <span className={classes.span}> {numPlaylists} </span>
            <span className={classes.textWrapper3}> Playlists </span>
          </p>
          <div className={classes.textWrapper4}>Playlists</div>
          <div className={classes.textWrapper5}>{localStorage.getItem('username')}</div>
          <div className={classes.ellipse} />
          <div className={classes.playlistGrid}>
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
                    <span className={classes.textWrapper10}>
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
