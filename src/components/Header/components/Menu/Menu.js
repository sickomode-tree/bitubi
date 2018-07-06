import React from 'react'
import { IndexLink, Link } from 'react-router'
import { Container as ContainerUI, Menu as MenuUI } from 'semantic-ui-react'
import { Search } from './components/Search/Search'

const Menu = props => (
  <MenuUI fixed={'top'} stackable borderless>
    <ContainerUI>
      <IndexLink to='/' className='item' activeClassName='active'>Главная</IndexLink>
      <Link to='/account/profile' className='item' activeClassName='active'>Профиль</Link>
      <Link to='/account/tenders' className='item' activeClassName='active'>Тендеры</Link>
      <Link to='/account/favourites' className='item' activeClassName='active'>Закладки</Link>
      <Link to='/account/history' className='item' activeClassName='active'>История</Link>
      <MenuUI.Item style={{flex: 1}}>
          <Search />
        </MenuUI.Item>

      <MenuUI.Menu position='right'>

        <a className='item' href={''}>
          Войти
        </a>
      </MenuUI.Menu>
    </ContainerUI>
  </MenuUI>
)

export default Menu
