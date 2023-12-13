import React from "react";
import classes from "../CSS/AccountPage.module.css";
import plusImage from "../Images/plus.svg";
import checkImage from "../Images/check.svg";

export default function ResultPage() {
  // Sample data routed from home page
  const playlists = [
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
  ];
  const generateText = "Lorem ipsum dolor sit amet, consect";
  // const [isClicked, setIsClicked] = React.useState(false);
  const [isClicked, setIsClicked] = React.useState(new Array(playlists.length).fill(false));
  const handleButtonClick = (index) => {
    const newIsClicked = [...isClicked];
    newIsClicked[index] = !newIsClicked[index];
    // setIsClicked(!isClicked);
    setIsClicked(newIsClicked);
    console.log("cleec");
  }
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
              {/* {isClicked[index] ? (
                <img
                  src={checkImage}
                  alt="check"
                  className={classes.addButton}
                  onClick={() => handleButtonClick(index)}
                  />
              ) : (
                <img src={plusImage} alt="plus" className={classes.addButton} />
              )} */}
              <img
                src={isClicked[index] ? checkImage : plusImage}
                alt={isClicked[index] ? "check" : "plus"}
                className={classes.addButton}
                onClick={() => handleButtonClick(index)} // Attach the onClick handler to both images
              />
            </div>
          ))}
        </div>
        <div className={classes.textWrapper8}>Generated from: </div>
        <div className={classes.textWrapper9}>"{generateText}"</div>
      </div>
    </div>
  );
}
