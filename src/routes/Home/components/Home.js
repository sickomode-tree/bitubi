import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Card} from 'semantic-ui-react'
import CardGrid from 'components/CardGrid/CardGrid'
import {getObjectValue} from 'utils/array'

export default class Home extends Component {
  static propTypes = {
    filter: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired,
    fetchProducts: PropTypes.func.isRequired,
    changeFilterValue: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const {products, filter} = this.props
    const cards = this.getCards.call(this, products)
    const groupKey = _.isEmpty(filter.filters) && _.isEmpty(filter.searchTerm) ? 'category.title' : 'subcategory.title'

    return (
      <CardGrid
        cards={cards}
        getCardComponent={this.getCardComponent.bind(this)}
        groupKey={groupKey}
      />
    )
  }

  getProductCards(items) {
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

  getSubcategoryCards(items) {
    let subcategoryMap = {}
    let subcategories = []

    items.forEach(card => {
      subcategoryMap[card.subcategory.id] = {
        header: card.subcategory.title,
        category: card.category,
        subcategory: card.subcategory,
      }
    })

    subcategories = _.map(subcategoryMap, subcategory => subcategory)

    return subcategories;
  }

  getCards(items) {
    const {filter} = this.props;

    if (_.isEmpty(filter.filters) && _.isEmpty(filter.searchTerm)) {
      return this.getSubcategoryCards.call(this, items)
    } else {
      return this.getProductCards.call(this, items)
    }
  }

  getCardComponent(card) {
    const {filter} = this.props

    if (_.isEmpty(filter.filters) && _.isEmpty(filter.searchTerm)) {
      return this.getSubcategoryCardComponent.call(this,card)
    }

    return this.getProductCardComponent.call(this, card)
  }

  getSubcategoryCardComponent(card) {
    return <Card
      header={card.subcategory.title}
      style={{flex: '0 1 25%'}}
      link={true}
      onClick={() => this.props.changeFilterValue('subcategory.title', card.subcategory.title)}
    />
  }

  getProductCardComponent(card) {
    return <Card
      header={card.provider.name}
      meta={card.provider.city}
      description={card.description}
      style={{flex: '0 1 25%'}}
    />
  }
}
