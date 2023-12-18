import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>PAGE NOT FOUND</h1>
      <div>
        <Link to="/" className="link-dark">
          GO BACK TO HOMEPAGE
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
