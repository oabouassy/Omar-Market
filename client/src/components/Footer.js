import "../styles/Footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <section className="footer">
      <div className="container">
        <p className="footer_about">
          created by{" "}
          <Link to="/about" className="footer_about_dev">
            Omar Abouassy
          </Link>
          &copy; 2021
        </p>
      </div>
    </section>
  );
};
export default Footer;
