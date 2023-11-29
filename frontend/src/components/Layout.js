import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Viewport from './Viewport'

const Layout = (props) => {
    // console.log(props)
    return (
        <div className='App'>
            <Header />
            <Sidebar template= {props.template}/>
            <Viewport />
            {props.children}
        </div>
    )
}

export default Layout