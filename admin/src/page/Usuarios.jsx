import React from 'react'
import Navbar from '../components/navbar/Navbar'
import UsuariosRegistrados from '../components/usuariosregistrados/UsuariosRegistrados'
import AdminFooter from '../components/footer/Footer'


const Usuarios = () => {
  return (
    <>
    <Navbar />
    <UsuariosRegistrados />
    <AdminFooter/>
    </>
  )
}

export default Usuarios