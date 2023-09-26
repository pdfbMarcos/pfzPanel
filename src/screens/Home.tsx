import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.jpeg";
import useIdle from "../hooks/useIdleTimer";
import { AuthContext } from "../contexts/auth";

function HomePage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const { logout } = useContext(AuthContext);

  const handleIdle = () => {
    setShowModal(true); //show modal
    setRemainingTime(30); //set 15 seconds as time remaining
  };

  const { isIdle } = useIdle({ onIdle: handleIdle, idleTime: 0.1 });

  useEffect(() => {
    let interval: any;

    if (isIdle && showModal) {
      interval = setInterval(() => {
        setRemainingTime(
          (prevRemainingTime) =>
            prevRemainingTime > 0 ? prevRemainingTime - 1 : 0 //reduces the second by 1
        );
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isIdle, showModal]);

  useEffect(() => {
    if (remainingTime === 0 && showModal) {
      //console.log("Time out!");
      setShowModal(false);
      logout();
    }
  }, [remainingTime, showModal, navigate]); // this is responsoble for logging user out after timer is down to zero and they have not clicked anything

  return (
    <div>
      <img src={logo} width="200" height="150" alt="" />
      <h1>Welcome to the Panel</h1>
      <p>Thank you for logging in!</p>
    </div>
  );
}

export default HomePage;
