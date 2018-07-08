import React, { Component } from 'react'
import {browserHistory, IndexLink, Link} from 'react-router'
import PropTypes from 'prop-types'
import {Container, Dropdown, Image, Item, Menu} from 'semantic-ui-react'
import {Search} from './components/Search/Search'
import SignInModal from './components/SignInModal/SignInModal'
import SignUpModal from './components/SignUpModal/SignUpModal'

class Header extends Component {
  render() {
    const { isAuthorized } = this.props

    return (
      <Menu fixed={'top'} stackable borderless>
        <Container>
          {
            isAuthorized &&
            <Menu.Menu position='left'>
              <IndexLink to='/' className='item' activeClassName='active'>Главная</IndexLink>
              <Link to='/account/tenders' className='item' activeClassName='active'>Тендеры</Link>
              <Link to='/account/favourites' className='item' activeClassName='active'>Закладки</Link>
              <Link to='/account/history' className='item' activeClassName='active'>История</Link>
            </Menu.Menu>
          }
          <Menu.Item style={{flex: 1}}>
            <Search/>
          </Menu.Item>
          <Menu.Menu position='right'>
            {
              isAuthorized &&
              <Dropdown item trigger={
                <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' avatar/>
              }>
                <Dropdown.Menu>
                  <Link to='/account/profile' className='item' activeClassName='active'>Личный кабинет</Link>
                  <a className='item' onClick={this.handleSignOut.bind(this)}>Выйти</a>
                </Dropdown.Menu>
              </Dropdown>
            }
            {
              !isAuthorized &&
              <Item><SignUpModal handleSignUp={this.handleSignUp.bind(this)}/></Item>
            }
            {
              !isAuthorized &&
              <SignInModal handleSignIn={this.handleSignIn.bind(this)}/>
            }
          </Menu.Menu>
        </Container>
      </Menu>
    )
  }

  handleSignUp(form) {
    this.props.sendRegisterRequest(form);
    browserHistory.push('/')
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
  sendRegisterRequest: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
}

export default Header
