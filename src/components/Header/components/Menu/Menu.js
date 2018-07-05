import React from 'react'
import { IndexLink, Link } from 'react-router'
import { Button as ButtonUI, Input as InputUI, Menu as MenuUI, Select as SelectUI } from 'semantic-ui-react'

const Menu = props => (
  <MenuUI stackable>
    <IndexLink to='/' className='item' activeClassName='active'>Главная</IndexLink>
    <Link to='/account/profile' className='item' activeClassName='active'>Профиль</Link>
    <Link to='/account/tenders' className='item' activeClassName='active'>Тендеры</Link>
    <Link to='/account/favourites' className='item' activeClassName='active'>Закладки</Link>
    <Link to='/account/history' className='item' activeClassName='active'>История</Link>

    <MenuUI.Menu position='right'>
      <MenuUI.Item>
        <InputUI placeholder='Поиск...' action>
          <input />
          <SelectUI compact options={[
            { key: 'all', text: 'All', value: 'all' },
            { key: 'articles', text: 'Articles', value: 'articles' },
            { key: 'products', text: 'Products', value: 'products' },
          ]} defaultValue='articles' />
          <SelectUI compact options={[
            { key: 'all', text: 'All', value: 'all' },
            { key: 'articles', text: 'Articles', value: 'articles' },
            { key: 'products', text: 'Products', value: 'products' },
          ]} defaultValue='articles' />

          <ButtonUI icon='filter' />
        </InputUI>
      </MenuUI.Item>

      <a className='item' href={''}>Выйти</a>
    </MenuUI.Menu>
  </MenuUI>
)

export default Menu
