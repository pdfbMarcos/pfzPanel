import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import repImg from "../assets/images/Report.png.webp";
import docImg from "../assets/images/417213.png";
import sigImg from "../assets/images/1584553.png";
import useIdle from "../hooks/useIdleTimer";
import { AuthContext } from "../contexts/auth";
import "../assets/styles/home.css";

import axios from "axios";

function HomePage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const { logout } = useContext(AuthContext);

  // Envelope status
  // https://www.significant.com/Api/v6/envelope/43b4ad5e-9022-4860-9116-944af17258d3
  // ID do documento
  // https://www.significant.com/Api/v6/envelope/43b4ad5e-9022-4860-9116-944af17258d3/files
  // Download documento
  // https://www.significant.com/Api/v6/file/5fff35f3-5939-453b-89aa-fa400e27262d

  async function handleGet() {
    const cors_api_url = "https://cors-anywhere.herokuapp.com/";
    await axios
      .get(
        cors_api_url +
          `https://www.significant.com/Api/v6/envelope/43b4ad5e-9022-4860-9116-944af17258d3/files`,
        {
          headers: {
            ApiToken:
              "1wl7z1orjjyuaab6f9yi1p8ch0hw3sg2py0jhjbbzxvni9wccvpqpym176bwzzjn",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      });
  }

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
        <a href="#" className="btn btn-primary btn-lg" onClick={handleGet}>
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
