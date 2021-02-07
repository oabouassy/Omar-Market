import { useState } from "react";
import { useHistory } from "react-router-dom";
import "../styles/SignUp.css";
const SignUp = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [allErrors, setAllErrors] = useState([]);
  const [registered, setRegistered] = useState("");

  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // e.target.reset();
    let errors = [];
    if (!firstname || !lastname || !email || !password || !password2) {
      errors.push("Please enter all fields");
    }
    if (password.length < 6) {
      errors.push("Password should be at least 6 characters");
    }
    if (password !== password2) {
      errors.push("Passwords do not match");
    }
    setAllErrors(errors);
    if (allErrors.length === 0) {
      let userinfo = {
        firstname,
        lastname,
        email,
        password,
        isadmin: false,
      };
      try {
        const res = await fetch(
          "https://omar-market-api.herokuapp.com/api/signup",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userinfo),
          }
        );
        const data = await res.json();
        if (data.err) {
          setRegistered(
            "This email is associated with another existed account"
          );
        } else {
          setRegistered(
            "You have successfully registered, you will be redirected to log in ..."
          );
          setTimeout(() => {
            history.push("/sign-in");
          }, 2000);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="total">
      {registered ? <h2 className="registered">{registered}</h2> : null}
      <ul className="errors">
        {allErrors.map((err) => (
          <div className="err" key={err}>
            <i className="icon fas fa-exclamation"></i>
            <li>{err}</li>
          </div>
        ))}
      </ul>
      <form
        action="/sign-up"
        method="post"
        className="signup_form"
        onSubmit={handleSubmit}
      >
        <div className="container">
          <h1 className="signup_heading">Create a new account</h1>
          <input
            type="text"
            placeholder="first name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            type="text"
            placeholder="last name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="confirm your password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />

          <button type="submit" className="signup_btn">
            register
          </button>
        </div>
      </form>
    </div>
  );
};
export default SignUp;
