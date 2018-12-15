import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import PropTypes from 'prop-types'
import {Button, Icon, Input, Dropdown, Responsive, Search as SUISearch} from 'semantic-ui-react'
import {getValues} from 'utils/array'
import SignInModal from '../SignInModal/SignInModal'
import FilterModal from '../FilterModal/FilterModal'
import _ from 'lodash'

class SearchExampleStandard extends Component {
  static propTypes = {
    cards: PropTypes.array.isRequired,
  }

  componentWillMount () {
    this.resetComponent()
  }

  componentWillReceiveProps () {
    this.setState({
      value: this.props.searchTerm
    })
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (event, { result }) => {
    this.setState({ value: result.title })
    this.props.changeSearchTerm(result.title)

    if (window.location.pathname !== '/') {
      browserHistory.push('/')
    }
  }

  handleSearchInputKeyPress (event) {
    if (event.key === 'Enter') {
      this.handleResultSelect.call(this, event.target.value)
    }
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    const source = this.props.cards.map(card => ({
      ...card,
      title: card.providerName,
      subcategoryTitle: card.subcategory.title,
    }))

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.providerName) || re.test(result.subcategory.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 300)
  }

  render () {
    const { isLoading, value, results } = this.state

    return (
      <SUISearch
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
        onKeyPress={this.handleSearchInputKeyPress.bind(this)}
        results={results}
        value={value}
        fluid
        // category
        resultRenderer={({ title, subcategoryTitle }) => (
          <div>
            <div style={{ fontWeight: 600 }}>{title}</div>
            <small style={{ color: '#929292' }}>{subcategoryTitle}</small>
          </div>
        )}
        style={{ flex: 1 }}
        {...this.props}
      />
    )
  }
}

export default class Search extends Component {
  static propTypes = {
    cards: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
    isAuthorized: PropTypes.bool.isRequired,
    searchTerm: PropTypes.string.isRequired,
    changeFilterValue: PropTypes.func.isRequired,
    changeSearchTerm: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    fetchProducts: PropTypes.func.isRequired,
    handleSignIn: PropTypes.func.isRequired,
    resetFilter: PropTypes.func.isRequired,
  }

  state = {
    filterModalOpen: false,
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  render () {
    const { categories, filters, isAuthorized, searchTerm, fetchProducts, handleSignIn } = this.props
    const quickFilters = [{ title: 'Категория', key: 'category.title' }]

    return (
      <Input action>
        <SearchExampleStandard
          cards={this.props.cards}
          searchTerm={this.props.searchTerm}
          changeSearchTerm={this.props.changeSearchTerm}
        />

        {
          quickFilters.map(quickFilter => (
            <Responsive
              as={Dropdown} minWidth={Responsive.onlyLargeScreen.minWidth}
              key={quickFilter.key} name={quickFilter.key} placeholder={quickFilter.title}
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
            trigger={
              <Button icon basic={_.isEmpty(filters)} color={'green'} onClick={this.handleFilterModalToggle.bind(this)}>
                <Icon name='filter' />
              </Button>
            }
            open={this.state.filterModalOpen}
            filters={filters}
            categories={categories}
            getOptions={this.getOptions.bind(this)}
            handleModalToggle={this.handleFilterModalToggle.bind(this)}
            handleFilterChange={this.handleFilterChange.bind(this)}
            handleFilterReset={this.handleFilterReset.bind(this)}
          />
        }
        {
          !isAuthorized &&
          <SignInModal
            trigger={<Button color='green' icon='filter' basic />}
            handleSignIn={handleSignIn}
            fetchProducts={fetchProducts}
          />
        }
        <Button
          icon='sync'
          basic
          color='green'
          disabled={_.isEmpty(filters) && _.isEmpty(searchTerm)}
          onClick={this.handleFilterReset.bind(this)}
        />
      </Input>
    )
  }

  getOptions(key, selectedFilters) {
    let {cards, filters} = this.props
    let values = getValues(cards, key), options

    filters = selectedFilters || filters

    if (key === 'subcategory.title' && filters['category.title']) {
      values = this.props.categories.find(category => category.title === filters['category.title']).children
        // filter only existing options
        .filter(subcategory => values.indexOf(subcategory.title) >= 0)
        // retrieve titles
        .map(subcategory => subcategory.title)
    }

    options = values.map((value, index) => ({
      key: index,
      text: value,
      value: value,
    }))

    return options
  }

  handleFilterModalToggle() {
    this.setState({filterModalOpen: !this.state.filterModalOpen})
  }

  handleFilterChange(event, data) {
    const filter = data.name,
      value = data.value

    this.props.changeFilterValue(filter, value)

    browserHistory.push('/')
  }

  handleFilterReset() {
    this.props.resetFilter()
    browserHistory.push('/')
  }

  handleSearchButtonClick() {
    this.props.searchChangeValue(this.state.searchValue)
  }
}
