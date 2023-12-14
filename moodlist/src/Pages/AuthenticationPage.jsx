import { useState, useEffect } from "react";
import { Tabs, Tab, Button, Form } from "react-bootstrap";
import { json, redirect } from "react-router-dom";
import AuthForm from "../Components/AuthForm";
import classes from "../CSS/AuthenticationPage.module.css";

function AuthenticationPage() {
  return (
    <div className={classes.authenticationPage}
    >
      <div className={classes.logo}>
        <h1>Mood.List</h1>
      </div>
      <div className={classes.loginPage}>
        <div className={classes.loginFormContainer}>
          <div className={classes.loginForm}>
            <AuthForm />
          </div>
        </div>
      </div>
      {/* <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1982px-Spotify_icon.svg.png"
        alt="spotifyLogo"
      /> */}
    </div>
  );
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }

  const data = await request.formData();
  // const authData = {
  //   email: data.get("email"),
  //   password: data.get("password"),
  // };

  return redirect(process.env.REACT_APP_HOST + "/login");

  // const response = await fetch("http://localhost:8080/" + mode, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(authData),
  // });

  // if (response.status === 422 || response.status === 401) {
  //   return response;
  // }

  // if (!response.ok) {
  //   throw json({ message: "Could not authenticate user." }, { status: 500 });
  // }

  // const resData = await response.json();
  // const token = resData.token;

  // localStorage.setItem("token", token);
  // const expiration = new Date();
  // expiration.setHours(expiration.getHours() + 1);
  // localStorage.setItem("expiration", expiration.toISOString());

  // return redirect("/");
}
