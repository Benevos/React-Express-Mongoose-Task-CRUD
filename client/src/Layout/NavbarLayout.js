import React from 'react'

function NavbarLayout( { children } ) 
{
  return (
    <div>
        <nav>
          <h1>Navbar</h1>
          <ul>
            <li>
              <a href="/">
                index
              </a>
            </li>
            <li>
              <a href="/about">
                about
              </a>
            </li>
            <li>
              <a href="/edit">
                edit
              </a>
            </li>
          </ul>
        </nav>

        { children }

    </div>
  )
}

export default NavbarLayout