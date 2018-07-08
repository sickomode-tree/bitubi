import React, { Component } from 'react'
import {browserHistory, IndexLink, Link} from 'react-router'
import PropTypes from 'prop-types'
import {Container, Image, Item, Menu} from 'semantic-ui-react'
import {Search} from './components/Search/Search'
import LoginModal from './components/LoginModal/LoginModal'

class Header extends Component {
  render() {
    const { isAuthorized } = this.props

    return (
      <Menu fixed={'top'} stackable borderless>
        <Container>
          <IndexLink to='/' className='item' activeClassName='active'>Главная</IndexLink>
          <Link to='/account/tenders' className='item' activeClassName='active'>Тендеры</Link>
          <Link to='/account/favourites' className='item' activeClassName='active'>Закладки</Link>
          <Link to='/account/history' className='item' activeClassName='active'>История</Link>
          <Menu.Item style={{flex: 1}}>
            <Search/>
          </Menu.Item>
          <Menu.Menu position='right'>
            {
              isAuthorized &&
              <Link to='/account/profile' className='item' activeClassName='active'>
                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' avatar/>
                <span>Профиль</span>
              </Link>
            }
            {
              isAuthorized &&
              <a className='item' onClick={this.handleSignOut.bind(this)}>Выйти</a>
            }
            {
              !isAuthorized &&
              <LoginModal handleSignIn={this.handleSignIn.bind(this)}/>
            }
          </Menu.Menu>
        </Container>
      </Menu>
    )
  }

  handleSignIn(form) {
    this.props.sendAuthRequest(form);
    browserHistory.push('/')
  }

  handleSignOut() {
    this.props.signOut()
    browserHistory.push('/')
  }
}

Header.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  sendAuthRequest: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
}

export default Header
