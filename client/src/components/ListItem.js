import { Link } from "react-router-dom";

const ListItem = ({ to, name }) => {
  return (
    <li>
      <Link to={to} className="item">
        {name}
      </Link>
    </li>
  );
};
export default ListItem;
