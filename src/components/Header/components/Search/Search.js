import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types'
import { Button, Icon, Input, Dropdown, Label } from 'semantic-ui-react'
import { getValues } from 'utils/array'
import SignInModal from '../SignInModal/SignInModal'
import FilterModal from '../FilterModal/FilterModal'
import _ from 'lodash'

export default class Search extends Component {
  static propTypes = {
    cards: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
    isAuthorized: PropTypes.bool.isRequired,
    searchTerm: PropTypes.string.isRequired,
    changeFilterValue: PropTypes.func.isRequired,
    changeSearchTerm: PropTypes.func.isRequired,
    fetchProducts: PropTypes.func.isRequired,
    handleSignIn: PropTypes.func.isRequired,
    resetFilter: PropTypes.func.isRequired,
  }

  state = {
    searchTerm: '',
  }

  render () {
    const { filters, isAuthorized, searchTerm, fetchProducts, handleSignIn } = this.props
    const quickFilters = [
      { title: 'Город', key: 'city.name' },
      { title: 'Категория', key: 'category.title' },
    ]

    return (
      <Input placeholder='Поиск...' action>
        <input
          onChange={event => this.handleSearchInputChange.call(this, event)}
          onKeyPress={event => this.handleSearchInputKeyPress.call(this, event)}
        />
        {
          quickFilters.map(quickFilter => (
            <Dropdown key={quickFilter.key} name={quickFilter.key} placeholder={quickFilter.title}
              options={this.getOptions.call(this, quickFilter.key)} value={filters[quickFilter.key] || null}
              search selection noResultsMessage='Нет результатов.'
              selectOnBlur={false} selectOnNavigation={false} wrapSelection={false}
              style={{ width: 100, whiteSpace: 'nowrap' }}
              onChange={(event, data) => this.handleFilterChange.call(this, event, data)}
            />
          ))
        }
        {
          isAuthorized &&
          <FilterModal
            trigger={<Button icon basic><Icon name='filter' color={_.isEmpty(filters) ? 'grey' : 'green'} /></Button>}
            filters={filters}
            getOptions={this.getOptions.bind(this)}
            handleFilterChange={this.handleFilterChange.bind(this)}
            handleResetFilterButtonClick={this.handleResetFilterButtonClick.bind(this)}
          />
        }
        {
          !isAuthorized &&
          <SignInModal trigger={<Button icon='filter' basic />} handleSignIn={handleSignIn} fetchProducts={fetchProducts} />
        }
        <Button icon='sync' basic disabled={_.isEmpty(filters) && _.isEmpty(searchTerm)}
          onClick={this.handleResetFilterButtonClick.bind(this)} />
      </Input>
    )
  }

  getOptions (key) {
    const { cards } = this.props

    const values = getValues(cards, key)

    let options = values.map((value, index) => ({
      key: index,
      text: value,
      value: value,
    }))

    return options
  }

  handleSearchInputChange (event) {
    this.setState({
      searchTerm: event.target.value,
    })
  }

  handleFilterChange (event, data) {
    const filter = data.name,
      value = data.value

    this.props.changeFilterValue(filter, value)
    browserHistory.push('/')
  }

  handleSearchInputKeyPress (event) {
    if (event.key === 'Enter') {
      this.props.changeSearchTerm(this.state.searchTerm)
      browserHistory.push('/')
    }
  }

  handleResetFilterButtonClick () {
    this.props.resetFilter()
    browserHistory.push('/')
  }

  handleSearchButtonClick () {
    this.props.searchChangeValue(this.state.searchValue)
  }
}
