import { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import userService, { User } from "../services/user-service";
import useUsers from "../hooks/useUsers";

type AuthContextProps = {
  children: ReactNode;
};

type AuthContextType = {
  user: {};
  signIn: (email: string, password: string) => void;
  logout: () => void;
};

const initialValues = {
  user: [],
  signIn: () => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(initialValues);

export const AuthProvider = ({ children }: AuthContextProps) => {
  const { user, setUser, setError } = useUsers();

  const navigate = useNavigate();

  async function signIn(email: string, password: string) {
    const { request, cancel } = userService.getUser<User>(email, password);
    await request
      .then((res) => {
        if (res.data.length == 1) {
          if (res.data[0].emSessao == 1) {
            toast.warning("Usuario já tem uma sessão ativa!");
            return;
          }
          setUser(res.data);
          storageKey(res.data[0].id);
          updateSession(1, res.data[0].id);
          toast.success("Bem-vindo(a)!");
          navigate("/Home");
        } else {
          toast.warning("Usuario e/ou senha invalidos!");
        }
        //console.log("nome: ", res.data[0].nome);
      })
      .catch((err) => {
        setError(err.message);
        console.log(err.message);
        toast.error("Ops!!! Algo correu mal!");
      });
  }

  async function updateSession(tipo: number, id: number) {
    const { request, cancel } = userService.updateSession<User>(tipo, id);
    await request
      .then((res) => {
        //console.log("Sucesso updateSession");
      })
      .catch((err) => {
        setError(err.message);
        toast.error("Ops!!! Algo correu mal!");
      });
  }

  function storageKey(id: number) {
    localStorage.setItem("@ticketsPRO", geraStringAleatoria(30));
    localStorage.setItem("@ticketsBEG", JSON.stringify(id));
  }

  async function logout() {
    //console.log(user);
    let id;
    const x = localStorage.getItem("@ticketsBEG");
    if (x) {
      id = parseInt(x);
      await updateSession(0, id);
    } else {
      toast.error("Ops!!! Problemas ao liberar sessão do usuário!");
    }
    localStorage.removeItem("@ticketsPRO");
    localStorage.removeItem("@ticketsBEG");
    navigate("/");
  }

  function geraStringAleatoria(tamanho: number) {
    var stringAleatoria = "";
    var caracteres =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < tamanho; i++) {
      stringAleatoria += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length)
      );
    }
    return stringAleatoria;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
