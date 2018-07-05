import React from 'react'
import { Link } from 'react-router'
import Search from './components/Search/Search'
import Filter from './components/Filter/Filter'
import Menu from './components/Menu/Menu'
import Logo from './components/Logo/Logo'

const Header = props => (
  <header>
    <Logo />
    <Search />
    <Filter />
    <Link to='/account/profile'>Account</Link>
    <Menu />
  </header>
);

export default Header