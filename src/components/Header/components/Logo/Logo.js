import React from 'react'
import { IndexLink } from 'react-router'
import DuckImage from './assets/Duck.jpg'

const Logo = props => (
    <nav>
        <IndexLink to='/'>
            <img alt='This is a duck, because Redux!' className='duck' src={DuckImage} />
        </IndexLink>
    </nav>
)

export default Logo