import React, { useState } from "react";
import classes from "../CSS/AccountPage.module.css";
import plusImage from "../Images/plus.svg";
import checkImage from "../Images/check.svg";

export default function ResultPage() {
  const playlists = JSON.parse(localStorage.getItem('resultplaylists'));
  const [clickedPlaylist, setClickedPlaylist] = useState(null);
  const dateOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  const handleButtonClick = (embedLink) => {
    const currentDate = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(currentDate);
    
    // Log the corresponding playlist.embedLink to the console
    console.log("Clicked Playlist:", embedLink);
    console.log("userid: ", localStorage.getItem('userid'));
    console.log("date: ", formattedDate)

    // Update the state to track the clicked playlist
    setClickedPlaylist(embedLink);
  };

  return (
    <div className={classes.accountPage}>
      <div className={classes.div}>
        {/* <div className={classes.overlap}>
        <img
            className={classes.rectangle}
            alt="Rectangle"
            src="rectangle-1.svg"
          />
          <div className={classes.headerRect} />
          <div className={classes.textWrapper}>mood.list</div>
        </div> */}
        <div className={classes.textWrapper6}>Results</div>
        <div className={classes.playlistsWrapper}>
          {playlists.map((playlist, index) => (
            <div className={classes.playlistItem} key={index}>
              <p className={classes.bigNumber}>{index + 1}.</p>
              <iframe
                className={classes.playlistPlayer}
                src={playlist.embedLink}
                width="50%"
                height="152"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
              <button
                className={classes.addButton}
                onClick={() => handleButtonClick(playlist.embedLink)}
              >
                {clickedPlaylist === playlist.embedLink ? (
                  <img src={checkImage} alt="check" />
                ) : (
                  <img src={plusImage} alt="plus" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
