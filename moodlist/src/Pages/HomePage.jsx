import React, { useEffect, useState } from "react";
import classes from "../CSS/HomePage.module.css";
import { Navigate, redirect, useSearchParams } from "react-router-dom";
import { getAuthToken } from "../util/auth";
import { action as logoutAction } from "./Logout";

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const refresh_token = searchParams.get("refresh_token");
  const expires_in = searchParams.get("expires_in");
  const scope = searchParams.get("scope");
  const userid = searchParams.get("id");
  const email = searchParams.get("email");
  const token = searchParams.get("access_token");
  const [isTokenSet, setIsTokenSet] = useState(false);

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

      console.log("token set!");

      window.location.reload();
    }
  }, [token]);

  if (!getAuthToken() && !token) {
    console.log("deleting token!");
    localStorage.removeItem("token");
    return <Navigate to="/auth" />;
  }

  return (
    <div className={classes.homePage}>
      <div className={classes.overlapWrapper}>
        <div className={classes.overlap}>
          <div className={classes.group}>
            <div className={classes.overlapGroup}>
              <div className={classes.generateButton}>Generate</div>
            </div>
          </div>
          <div className={classes.overlapGroupWrapper}>
            <textarea
              className={classes.input}
              placeholder="Please enter some text, such as a poem, song lyrics, or an essay. Max 500 words."
            />
          </div>
          <div className={classes.titleWrapper}>mood.list</div>
        </div>
      </div>
    </div>
  );
}
