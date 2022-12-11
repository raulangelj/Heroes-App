import React, { useContext } from "react";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../auth/context";

export const PrivateRoute = ({ children }) => {
  const { logged } = useContext(AuthContext);
  const { pathname, search } = useLocation();

  useEffect(() => {
    const lastPath = pathname + search;
    localStorage.setItem("lastPath", lastPath);
  }, [pathname, search]);

  return logged ? children : <Navigate to="/login" />;
};
