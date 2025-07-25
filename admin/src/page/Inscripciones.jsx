import React from 'react'
import Navbar from '../components/navbar/Navbar'
import InscripcionesAdmin from '../components/inscripciones/InscripcionesAdmin'
import AdminFooter from '../components/footer/Footer'

const Inscripciones = () => {
  return (
    <>
    <Navbar />
    <InscripcionesAdmin />
    <AdminFooter/>
    </>
  )
}

export default Inscripciones