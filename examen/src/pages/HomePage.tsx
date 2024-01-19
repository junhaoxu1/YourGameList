import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const HomePage = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <h1>Welcome To YourGameList!</h1>
      {currentUser ? (
        <>
          <h2>Hello {currentUser.email}</h2>
          <h3>
            Get started! Click{" "}
            <Link className="border border-light" to="/games">
              HERE
            </Link>{" "}
            to browse games
          </h3>
        </>
      ) : (
        <h2>
          Please{" "}
          <Link className="border border-light" to="/login">
            Login
          </Link>{" "}
          or{" "}
          <Link className="border border-light" to="/signup">
            Sign up
          </Link>{" "}
          for a better experience!
        </h2>
      )}
    </>
  );
};

export default HomePage;
