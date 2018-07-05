import React from 'react'
import { IndexLink, Link } from 'react-router'

const Menu = props => (
    <nav>
        <IndexLink to='/' activeClassName='page-layout__nav-item--active'>Главная</IndexLink>
        {' · '}
        <Link to='/account/profile' activeClassName='page-layout__nav-item--active'>Профиль</Link>
        {' · '}
        <Link to='/account/tenders' activeClassName='page-layout__nav-item--active'>Тендеры</Link>
        {' · '}
        <Link to='/account/favourites' activeClassName='page-layout__nav-item--active'>Закладки</Link>
        {' · '}
        <Link to='/account/history' activeClassName='page-layout__nav-item--active'>История</Link>
        {' · '}
        <a href={''}>Выйти</a>
    </nav>
)

export default Menu
