import { useEffect, useState } from "react";
import { CanceledError } from "../services/api-client";
import logService, { Log } from "../services/log-service";

const useLogs = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const dtToday = new Date().toISOString().substring(0, 10);
    const { request, cancel } = logService.getAllByDate<Log>(dtToday);
    request
      .then((res) => {
        setLogs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  return { logs, error, isLoading, setLogs, setError };
};

export default useLogs;
