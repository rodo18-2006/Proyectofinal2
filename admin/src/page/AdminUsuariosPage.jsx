// src/pages/AdminUsuariosPage.jsx
import React, { useContext } from "react";
import UsuariosRegistrados from "../components/usuariosregistrados/UsuariosRegistrados";
import { UsuariosContext } from "../components/context/UsuariosContext";

export default function AdminUsuariosPage() {
  const { usuarios, loading } = useContext(UsuariosContext);

  return <UsuariosRegistrados usuarios={usuarios} loading={loading} />;
}
