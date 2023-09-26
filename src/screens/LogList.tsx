import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import useLogs from "../hooks/useLogs";
import logService, { Log } from "../services/log-service";
import useIdle from "../hooks/useIdleTimer";
import { AuthContext } from "../contexts/auth";

const LogList = () => {
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

  const { logs, error, isLoading, setLogs, setError } = useLogs();

  const dtRef = useRef<HTMLInputElement>(null);
  const matriculaRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (
      dtRef.current &&
      dtRef.current.value !== "" &&
      matriculaRef.current &&
      matriculaRef.current.value !== ""
    ) {
      //console.log(dtRef.current.value + " / " + matriculaRef.current.value);
      const { request, cancel } = logService.getAllByDataMatricula<Log>(
        dtRef.current.value,
        matriculaRef.current.value
      );
      request
        .then((res) => {
          setLogs(res.data);
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      if (matriculaRef.current && matriculaRef.current.value !== "") {
        const { request, cancel } = logService.getAllByMatricula<Log>(
          matriculaRef.current.value
        );
        request
          .then((res) => {
            setLogs(res.data);
          })
          .catch((err) => {
            setError(err.message);
          });
      } else {
        if (dtRef.current && dtRef.current.value !== "") {
          const { request, cancel } = logService.getAllByDate<Log>(
            dtRef.current.value
          );
          request
            .then((res) => {
              setLogs(res.data);
            })
            .catch((err) => {
              setError(err.message);
            });
        }
      }
    }
  };

  useEffect(() => {
    dtRef.current?.focus();
  }, []);

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}

      <h2 className="mb-4">LOGS de processamento</h2>

      <div className="row g-3 align-items-center mb-3">
        <div className="col-auto">
          <label htmlFor="data" className="form-label">
            Data
          </label>
        </div>
        <div className="col-auto">
          <input
            ref={dtRef}
            id="data"
            type="date"
            className="form-control"
            style={{ width: "150px" }}
          />
        </div>
        <div className="col-auto">
          <label htmlFor="matricula" className="form-label">
            Matricula
          </label>
        </div>
        <div className="col-auto">
          <input
            ref={matriculaRef}
            id="matricula"
            type="text"
            className="form-control"
            style={{ width: "150px" }}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={handleClick}
          style={{ width: "150px" }}
        >
          Buscar
        </button>
      </div>

      <table className="table table-hover table-sm">
        <thead className="table-secondary">
          <tr>
            <th scope="col">Mensagem</th>
            <th scope="col">Data</th>
            <th scope="col">Recebimento</th>
            <th scope="col">Matricula</th>
            <th scope="col">Ação</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr>
              <td>{log.mensagem}</td>
              <td>{log.data_processamento}</td>
              <td>{log.id_recebimento}</td>
              <td>{log.identificador}</td>
              <td>{log.acao}</td>
              <td>{log.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default LogList;
