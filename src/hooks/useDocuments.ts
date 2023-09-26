import { useEffect, useState } from "react";
import { CanceledError } from "../services/api-client";
import documentService, { Document } from "../services/document-services";

const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const dtToday = new Date().toISOString().substring(0, 10);
    const { request, cancel } = documentService.getAllByDate<Document>(dtToday);
    request
      .then((res) => {
        setDocuments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  return { documents, error, isLoading, setDocuments, setError };
};

export default useDocuments;
