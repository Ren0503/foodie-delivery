import React from 'react'
import NavBar from './navbar'
import Notify from './notify'
import Modal from './modal'
import Footer from './footer'


function Layout({ children }) {
    return (
        <>
            <NavBar />
            <Notify />
            <Modal />
            {children}
            <Footer />
        </>
    )
}

export default Layout