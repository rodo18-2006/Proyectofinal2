import { useContext, useEffect, useState } from "react";
import { UsuariosContext } from "../context/UsuariosContext";

const ProtectedRoute = ({ children, openLoginModal }) => {
  const { user } = useContext(UsuariosContext);
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    if (!user && !alertShown) {
      alert("Debes iniciar sesión para acceder a esta página.");
      openLoginModal();
      setAlertShown(true);
    }
  }, [user, alertShown, openLoginModal]);

  if (!user) return null;

  return children;
};

export default ProtectedRoute;
