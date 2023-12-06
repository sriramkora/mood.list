import React from "react";
import classes from "../CSS/HomePage.module.css";

export default function HomePage() {
    return (
        <div className={classes.homePage}>
        <div className={classes.overlapWrapper}>
          <div className={classes.overlap}>
            <div className={classes.group}>
              <div className={classes.overlapGroup}>
                <div className={classes.textWrapper}>Generate</div>
              </div>
            </div>
            <div className={classes.overlapGroupWrapper}>
              <textarea className={classes.input} placeholder="Please enter some text, such as a poem, song lyrics, or an essay. Max 500 words." />
            </div>
            <div className={classes.textWrapper2}>mood.list</div>
            {/* <div className={classes.group2}>
            </div> */}
          </div>
        </div>
      </div>
      );
}