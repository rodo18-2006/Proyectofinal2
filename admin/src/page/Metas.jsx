import React from 'react'
import Navbar from '../components/navbar/Navbar'
import CumplimientoMetas from '../components/metas/MetasCumplidas'
import AdminFooter from '../components/footer/Footer'

const Metas = () => {
  return (
    <>
    <Navbar />
    <CumplimientoMetas/>
    <AdminFooter />
    </>
  )
}

export default Metas