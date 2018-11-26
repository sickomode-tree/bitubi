import React, {Component} from 'react'
import {browserHistory, IndexLink, Link} from 'react-router'
import PropTypes from 'prop-types'
import {Dropdown, Image, Item, Menu, Responsive} from 'semantic-ui-react'
import Logo from './components/Logo/Logo'
import Search from './components/Search/Search'
import SignInModal from './components/SignInModal/SignInModal'
import SignUpModal from './components/SignUpModal/SignUpModal'
import {rootUrl} from 'utils/fetch'

export default class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    cards: PropTypes.array.isRequired,
    cities: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
    isAuthorized: PropTypes.bool.isRequired,
    searchTerm: PropTypes.string.isRequired,
    changeFilterValue: PropTypes.func.isRequired,
    changeSearchTerm: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    fetchCities: PropTypes.func.isRequired,
    fetchProducts: PropTypes.func.isRequired,
    resetFilter: PropTypes.func.isRequired,
    sendSingInRequest: PropTypes.func.isRequired,
    sendSingUpRequest: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired
  }

  render () {
    const {
        cards, cities, categories, filters, auth, user, isAuthorized,
        changeFilterValue, changeSearchTerm,
        fetchCategories, fetchCities, fetchProducts,
        resetFilter, searchTerm
      } = this.props

    const isProvider = auth.userType === 'provider',
      isCustomer = auth.userType === 'customer',
      isModerator = auth.userType === 'moderator'

    return (
      <Menu
        borderless
        secondary
        color={'green'}
        style={{background: '#fff', boxShadow: '0px 0px 10px 1px #ccc'}}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: 1400,
            margin:'0 auto',
          }}
        >
          <IndexLink to='/' className='item' onClick={resetFilter}><Logo/></IndexLink>
          {
            isAuthorized &&
            <Menu.Menu position='left'>
              <IndexLink to='/' className='item' activeClassName='active' onClick={resetFilter}>Главная</IndexLink>
              <Link to='/account/tenders' className='item' activeClassName='active' onClick={resetFilter}>Тендеры</Link>
              {
                (isProvider || isCustomer) &&
                <Link to='/account/favourites' className='item' activeClassName='active' onClick={resetFilter}>
                  Закладки
                </Link>
              }
              {
                (isProvider || isCustomer) &&
                <Link
                  to='/account/history'
                  className='item'
                  activeClassName='active'
                  onClick={resetFilter}
                >
                  История
                </Link>
              }
            </Menu.Menu>
          }
          {
            !isModerator &&
            <Menu.Item style={{flex: 1}}>
              <Responsive
                minWidth={Responsive.onlyTablet.minWidth}
                as={Search}
                cards={cards}
                filters={filters}
                isAuthorized={isAuthorized}
                searchTerm={searchTerm}
                changeFilterValue={changeFilterValue}
                changeSearchTerm={changeSearchTerm}
                fetchProducts={fetchProducts}
                handleSignIn={this.handleSignIn.bind(this)}
                resetFilter={resetFilter}
              />
            </Menu.Item>
          }
          {
            isAuthorized &&
            <Menu.Menu position='right'>

              <Dropdown item trigger={
                <Image src={user.photo && (rootUrl + user.photo.original)} avatar/>
              }>
                <Dropdown.Menu>
                  {
                    !isModerator &&
                    <Link to='/account/profile' className='item' activeClassName='active'>
                      Личный кабинет
                    </Link>
                  }
                  <a className='item' onClick={this.handleSignOut.bind(this)}>Выйти</a>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          }
          {
            !isAuthorized &&
            <div style={{display: 'flex'}}>
              <Item>
                <SignUpModal
                  cities={cities} categories={categories}
                  fetchProducts={fetchProducts} fetchCategories={fetchCategories} fetchCities={fetchCities}
                  onClose={fetchProducts} onSubmit={this.handleSignUp.bind(this)}
                />
              </Item>
              <Item>
                <SignInModal fetchProducts={fetchProducts} handleSignIn={this.handleSignIn.bind(this)}/>
              </Item>
            </div>
          }
        </div>
      </Menu>
    )
  }

  handleSignUp(form) {
    this.props.sendSingUpRequest(form)
  }

  handleSignIn(form) {
    this.props.sendSingInRequest(form)
  }

  handleSignOut() {
    this.props.signOut()
    this.props.resetFilter()
    browserHistory.push('/')
  }
}
