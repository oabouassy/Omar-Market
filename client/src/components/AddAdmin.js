import "../styles/AddAdmin.css";
import { useState } from "react";
const AddAdmin = () => {
  const [email, setEmail] = useState("");
  const [updated, setUpdated] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/user/${email}`, {
        method: "PUT",
      });
      const user = await response.json();
      if (user.email) {
        setUpdated(true);
        setTimeout(() => {
          setUpdated(false);
        }, 2000);
      } else {
        setError(user.message);
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="addAdmin">
      <div className="container">
        <h1 className="addAdmin_heading">Promote a user</h1>
        <form className="addAdmin_form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="User Email"
          />
          <button type="submit" className="addAdmin_form_btn">
            Make this user admin
          </button>
          {updated ? (
            <div className="addAdmin_updated">This user is now an admin</div>
          ) : null}
          {error && !updated ? (
            <div className="addAdmin_error">{error}</div>
          ) : null}
        </form>
      </div>
    </section>
  );
};
export default AddAdmin;
