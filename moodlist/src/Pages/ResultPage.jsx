import React from "react";
import classes from "../CSS/AccountPage.module.css";
import plusImage from "../Images/plus.svg";
import checkImage from "../Images/check.svg";

export default function ResultPage() {
  // Sample data from the backend
  const playlists = JSON.parse(localStorage.getItem('resultplaylists'));
  const isClicked = false;
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
              <div className={classes.logoutButton}>Profile</div>
            </div>
          </div> */}
        </div>
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
                allowfullscreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
              {isClicked ? (
                <img
                  src={checkImage}
                  alt="check"
                  className={classes.addButton}
                />
              ) : (
                <img src={plusImage} alt="plus" className={classes.addButton} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
