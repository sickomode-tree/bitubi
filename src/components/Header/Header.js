import React, {Component} from 'react'
import {browserHistory, IndexLink, Link} from 'react-router'
import PropTypes from 'prop-types'
import {Container, Dropdown, Image, Item, Menu} from 'semantic-ui-react'
import Search from './components/Search/Search'
import SignInModal from './components/SignInModal/SignInModal'
import SignUpModal from './components/SignUpModal/SignUpModal'
import {changeSearchTerm} from 'store/filter'

export default class Header extends Component {
  static propTypes = {
    cards: PropTypes.array.isRequired,
    cities: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    subcategories: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
    isAuthorized: PropTypes.bool.isRequired,
    searchTerm: PropTypes.string.isRequired,
    changeFilterValue: PropTypes.func.isRequired,
    changeSearchTerm: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    fetchSubcategories: PropTypes.func.isRequired,
    fetchCities: PropTypes.func.isRequired,
    fetchProducts: PropTypes.func.isRequired,
    resetFilter: PropTypes.func.isRequired,
    sendAuthRequest: PropTypes.func.isRequired,
    sendRegisterRequest: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired
  }

  render() {
    const {
      cards, cities, categories, subcategories, filters, isAuthorized,
      changeFilterValue, changeSearchTerm,
      fetchCategories, fetchSubcategories, fetchCities, fetchProducts,
      resetFilter, searchTerm
    } = this.props

    return (
      <Menu fixed='top' stackable borderless>
        <Container>
          {
            isAuthorized &&
            <Menu.Menu position='left'>
              <IndexLink to='/' className='item' activeClassName='active' onClick={resetFilter}>Главная</IndexLink>
              <Link to='/account/tenders' className='item' activeClassName='active'>Тендеры</Link>
              <Link to='/account/favourites' className='item' activeClassName='active'>Закладки</Link>
              <Link to='/account/history' className='item' activeClassName='active'>История</Link>
            </Menu.Menu>
          }
          <Menu.Item style={{flex: 1}}>
            <Search
              cards={cards}
              filters={filters}
              isAuthorized={isAuthorized}
              searchTerm={searchTerm}
              changeFilterValue={changeFilterValue}
              changeSearchTerm={changeSearchTerm}
              handleSignIn={this.handleSignIn.bind(this)}
              resetFilter={resetFilter}
            />
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
              <Item>
                <SignUpModal
                  cities={cities} categories={categories} subcategories={subcategories}
                  fetchCities={fetchCities} fetchCategories={fetchCategories} fetchSubcategories={fetchSubcategories}
                  handleSignUp={this.handleSignUp.bind(this)}
                  onClose={fetchProducts}
                />
              </Item>
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
    this.props.resetFilter()
    browserHistory.push('/')
  }
}
