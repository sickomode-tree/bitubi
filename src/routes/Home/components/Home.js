import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Card} from 'semantic-ui-react'
import CardGrid from 'components/CardGrid/CardGrid'
import {getObjectValue} from 'utils/array'

export default class Home extends Component {
  static propTypes = {
    products: PropTypes.array.isRequired,
    fetchProducts: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const { products } = this.props
    const cards = this.getCards.call(this, products)

    return (
      <CardGrid
        cards={cards}
        getCardComponent={this.getCardComponent.bind(this)}
        groupKey='category.title'
      />
    )
  }

  getCards(items) {
    const {filter} = this.props;
    let cards = items;

    // filter by search value
    cards = cards.filter(card => card.provider.name.toLowerCase().indexOf(filter.searchTerm.toLowerCase()) >= 0)

    if (!_.isEmpty(filter.filters)) {
      let isFilterTrue = false
      cards = _.filter(cards, card => {
        _.forIn(filter.filters, (filterValue, filterName) => {
          let cardValue = card

          filterName.split('.').forEach(key => {
            cardValue = cardValue[key]
          })

          isFilterTrue = cardValue === filterValue

          return isFilterTrue
        })
        return isFilterTrue
      })
    }

    console.log(cards)

    return cards;
  }

  getCardComponent(card) {
    return <Card
      header={card.provider.name}
      meta={card.provider.city}
      description={card.description}
      style={{flex: '0 1 25%'}}
    />
  }
}
