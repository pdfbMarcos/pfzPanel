import { useEffect, useContext } from "react";
import { AuthContext } from "../contexts/auth";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    console.log("logout");
  }, []);

  return (
    <div>
      {/* <img src={logo} width="200" height="150" alt="" />
      <h1>Thank you for using the Panel</h1>
      <p>See you!</p>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Acessar novamente!
      </button> */}
    </div>
  );
}

export default Logout;
