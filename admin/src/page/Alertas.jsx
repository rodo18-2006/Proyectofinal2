import React from 'react'
import Navbar from '../components/navbar/Navbar'
import AlertasImportantes from '../components/alertas/AlertasImportantes'
import AdminFooter from '../components/footer/Footer'

const Alertas = () => {
  return (
    <>
    <Navbar/>
    <AlertasImportantes />
    <AdminFooter />
    </>
  )
}

export default Alertas