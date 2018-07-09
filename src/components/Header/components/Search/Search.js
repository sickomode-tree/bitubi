import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import PropTypes from 'prop-types'
import {Button, Input, Dropdown} from 'semantic-ui-react'
import {getValues} from 'utils/array'
import SignInModal from '../SignInModal/SignInModal'

export default class Search extends Component {
  static propTypes = {
    cards: PropTypes.array.isRequired,
    filters: PropTypes.object.isRequired,
    isAuthorized: PropTypes.bool.isRequired,
    changeFilterValue: PropTypes.func.isRequired,
    changeSearchTerm: PropTypes.func.isRequired,
    handleSignIn: PropTypes.func.isRequired,
    resetFilter: PropTypes.func.isRequired,
  }

  state = {
    searchTerm: '',
  }

  render() {
    const {filters, isAuthorized, handleSignIn} = this.props

    return (
      <Input placeholder='Поиск...' action>
        <input
          onChange={event => this.handleSearchInputChange.call(this, event)}
          onKeyPress={event => this.handleSearchInputKeyPress.call(this, event)}
        />
        {
          [{title: 'Город', key: 'provider.city'}, {title: 'Категория', key: 'category.title'}].map(quickFilter => (
            <Dropdown key={quickFilter.key} name={quickFilter.key} placeholder={quickFilter.title}
                      options={this.getOptions.call(this, quickFilter.key)} value={filters[quickFilter.key] || null}
                      search={true} selection={true}
                      selectOnBlur={false} selectOnNavigation={false} wrapSelection={false}
                      style={{width: 100, whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}
                      onChange={(event, data) => this.handleQuickFilterChange.call(this, event, data)}
            />
          ))
        }
        {
          isAuthorized &&
          // <FilterModal/>
          <Button icon='filter' basic/>
        }
        {
          !isAuthorized &&
          <SignInModal trigger={<Button icon='filter' basic/>} handleSignIn={handleSignIn}/>
        }
        <Button icon='sync' basic disabled={_.isEmpty(filters)} onClick={this.handleResetFilterButtonClick.bind(this)}/>
      </Input>
    )
  }

  getOptions(key) {
    const {cards} = this.props

    const values = getValues(cards, key)

    let options = values.map((value, index) => ({
      key: index,
      text: value,
      value: value,
    }))

    return options
  }

  handleSearchInputChange(event) {
    this.setState({
      searchTerm: event.target.value,
    });
  }

  handleQuickFilterChange(event, data) {
    const filter = data.name,
      value = data.value;

    this.props.changeFilterValue(filter, value)
  }

  handleSearchInputKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.changeSearchTerm(this.state.searchTerm);
      browserHistory.push('/')
    }
  }

  handleResetFilterButtonClick() {
    this.props.resetFilter();
  }

  handleSearchButtonClick() {
    this.props.searchChangeValue(this.state.searchValue);
  }
}

