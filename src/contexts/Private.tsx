import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type AuthContextProps = {
  children: ReactNode;
};

export default function Private({ children }: AuthContextProps): any {
  const token = localStorage.getItem("@ticketsPRO");

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}
