import React from 'react'
import { Link } from 'react-router-dom'
import "./NewHeader.css"
function NewHeader() {
  return (
    <header>
        <nav className='navbar'>
            <Link to="/" className='nav-branding'>Dev</Link>
            <ul className='nav-menu'>
                <li className='nav-item'><Link to="/" className='nav-link'>Home</Link></li>
                <li className='nav-item'><Link to="/products" className='nav-link'>Products</Link></li>
                <li className='nav-item'><Link to="/about" className='nav-link'>About</Link></li>
            </ul>
            <div className="hamburger">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>


        </nav>
    </header>
  )
}

export default NewHeader
