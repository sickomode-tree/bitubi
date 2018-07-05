import React from 'react'
import { IndexLink, Link } from 'react-router'

const Menu = props => (
    <nav>
        <IndexLink to='/' activeClassName='page-layout__nav-item--active'>Home</IndexLink>
        {' · '}
        <Link to='/account/profile' activeClassName='page-layout__nav-item--active'>Account</Link>
    </nav>
)

export default Menu