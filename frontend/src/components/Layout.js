import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Viewport from './Viewport'

const Layout = (props) => {
    return (
        <div className='App'>
            <Header />
            <Sidebar />
            <Viewport />
            {props.children}
        </div>
    )
}

export default Layout