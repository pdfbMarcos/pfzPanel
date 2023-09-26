import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import useDocuments from "../hooks/useDocuments";
import documentService, { Document } from "../services/document-services";
import useIdle from "../hooks/useIdleTimer";
import { AuthContext } from "../contexts/auth";

const DocumentList = () => {
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

  const { documents, error, isLoading, setDocuments, setError } =
    useDocuments();

  const dtRef = useRef<HTMLInputElement>(null);
  const matriculaRef = useRef<HTMLInputElement>(null);
  const chaveRef = useRef<HTMLInputElement>(null);
  const documentoRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (
      dtRef.current &&
      dtRef.current.value !== "" &&
      matriculaRef.current &&
      matriculaRef.current.value !== ""
    ) {
      //console.log(dtRef.current.value + " / " + matriculaRef.current.value);
      const { request, cancel } =
        documentService.getAllByDataMatricula<Document>(
          dtRef.current.value,
          matriculaRef.current.value
        );
      request
        .then((res) => {
          setDocuments(res.data);
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      if (matriculaRef.current && matriculaRef.current.value !== "") {
        const { request, cancel } = documentService.getAllByMatricula<Document>(
          matriculaRef.current.value
        );
        request
          .then((res) => {
            setDocuments(res.data);
          })
          .catch((err) => {
            setError(err.message);
          });
      } else {
        if (dtRef.current && dtRef.current.value !== "") {
          const { request, cancel } = documentService.getAllByDate<Document>(
            dtRef.current.value
          );
          request
            .then((res) => {
              setDocuments(res.data);
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

      <h2 className="mb-4">DOCUMENTOS</h2>

      <div className="row g-3 align-items-center mb-3">
        <div className="col-auto">
          <label htmlFor="data" className="form-label">
            Envio
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
        <div className="col-auto">
          <label htmlFor="chave" className="form-label">
            Chave
          </label>
        </div>
        <div className="col-auto">
          <input
            ref={chaveRef}
            id="chave"
            type="text"
            className="form-control"
            style={{ width: "150px" }}
          />
        </div>
        <div className="col-auto">
          <label htmlFor="documento" className="form-label">
            Documento
          </label>
        </div>
        <div className="col-auto">
          <input
            ref={documentoRef}
            id="documento"
            type="text"
            className="form-control"
            style={{ width: "395px" }}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={handleClick}
          style={{ width: "100px" }}
        >
          Buscar
        </button>
      </div>

      <table className="table table-hover table-sm">
        <thead className="table-secondary">
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Matricula</th>
            <th scope="col">Status</th>
            <th scope="col">Situação</th>
            <th scope="col">Envio</th>
            <th scope="col">Assinatura</th>
            <th scope="col">Documento</th>
            <th scope="col">Chave</th>
            <th scope="col">Email</th>
            <th scope="col">Territorio</th>
            <th scope="col">Situação</th>
            <th scope="col">Envelope</th>
            <th scope="col">Inconsistencia</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document) => (
            <tr>
              <td>{document.nome}</td>
              <td>{document.matricula}</td>
              <td>{document.status}</td>
              <td>{document.situacao}</td>
              <td>{document.data_envio}</td>
              <td>{document.data_assinatura}</td>
              <td>{document.documento}</td>
              <td>{document.id_recebimento}</td>
              <td>{document.email}</td>
              <td>{document.territorio}</td>
              <td>{document.data_situacao}</td>
              <td>{document.envelope_id}</td>
              <td>{document.inconsistencia}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DocumentList;
