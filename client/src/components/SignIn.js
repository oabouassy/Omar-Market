import { useState, useContext } from "react";
import "../styles/SignIn.css";
import { useHistory } from "react-router-dom";
import loginContext from "../contexts/loginContext";

const SignIn = () => {
  const [error, setError] = useState("");
  const [isSigned, setIsSigned] = useState(false);
  const { loggedUser, setLoggedUser } = useContext(loginContext);
  // 2 states for the form input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // history object to direct user to another router after signing in
  const history = useHistory();

  // a function to deal with posting/getting data to/from  client
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    let info = {
      email,
      password,
    };

    // send data to the server
    try {
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(info),
      });
      const data = await res.json();
      if (data.message) {
        setError(data.message);
      } else {
        setLoggedUser(data);
        setIsSigned(true);
      }
      if (data.isadmin) {
        setTimeout(() => {
          history.push("/dashboard");
        }, 2000);
      } else {
        setTimeout(() => {
          history.push("/");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/logout");
      setLoggedUser({});
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="signin">
      {loggedUser.email ? (
        <div className="signed_in">
          <h1 className="signin_welcome">
            Hi {loggedUser.firstname}, You are logged in
          </h1>
          {isSigned && loggedUser.isadmin ? (
            <h1 className="signin_redirectionMessage">
              Welcome back boss! You will be redirected to your admin dashboard
              ...
            </h1>
          ) : null}
          {isSigned && !loggedUser.isadmin ? (
            <h1 className="signin_redirectionMessage">
              Glad to see you again {loggedUser.firstname}, you will be
              redirected to the home page ...
            </h1>
          ) : null}
          <button className="SignIn_signout_btn" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      ) : (
        <div className="not_signin">
          <h1 className="not_signin_error">{error}</h1>
          <div className="container">
            <form className="signin_form" onSubmit={handleSubmit}>
              <h1 className="signin_heading">Log in to your account</h1>
              <div className="not_signin_fields">
                <input
                  type="email"
                  name="email"
                  placeholder="type your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loggedUser.email}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="type your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loggedUser.email}
                />
                <button type="submit" className="signin_btn">
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default SignIn;
