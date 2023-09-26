import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import repImg from "../assets/images/Report.png.webp";
import docImg from "../assets/images/417213.png";
import sigImg from "../assets/images/1584553.png";
import useIdle from "../hooks/useIdleTimer";
import { AuthContext } from "../contexts/auth";
import "../assets/styles/home.css";

function HomePage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const { logout } = useContext(AuthContext);

  const handleIdle = () => {
    setShowModal(true); //show modal
    setRemainingTime(30); //set 15 seconds as time remaining
  };

  const { isIdle } = useIdle({ onIdle: handleIdle, idleTime: 0.9 });

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
    <div className="container">
      <div className="btn btn-light">
        <img src={docImg} width="200" height="200" alt="" />
        <h1>Envio de documentos</h1>
        <p>Enviar documentos para assinatura!</p>
        <a href="#" className="btn btn-primary btn-lg">
          Enviar
        </a>
      </div>

      <div className="btn btn-light">
        <img src={sigImg} width="200" height="200" alt="" />
        <h1>Verificar assinatura</h1>
        <p>Atualizar status de assinatura dos documentos!</p>
        <a href="#" className="btn btn-primary btn-lg">
          Ver Status
        </a>
      </div>

      <div className="btn btn-light">
        <img src={repImg} width="200" height="200" alt="" />
        <h1>Relatório de status</h1>
        <p>Gerar relatório de status atualizado!</p>
        <a href="#" className="btn btn-primary btn-lg">
          Gerar
        </a>
      </div>
    </div>
  );
}

export default HomePage;
