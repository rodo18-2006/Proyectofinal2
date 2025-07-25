import React from 'react'
import Navbar from '../components/navbar/Navbar'
import PagosPendientes from '../components/pagospendientes/PagosPendientes'
import AdminFooter from '../components/footer/Footer'

const Pendientes = () => {
  return (
    <>
    <Navbar />
    <PagosPendientes />
    <AdminFooter />
    </>
  )
}

export default Pendientes