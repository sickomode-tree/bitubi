import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Card } from 'semantic-ui-react'
import CardGrid from 'components/CardGrid/CardGrid'
import ProductCard from 'components/ProductCard/ProductCard'
import EmptyText from 'components/EmptyText/EmptyText'
import { getObjectValue } from 'utils/array'
import { isModerator } from 'utils/auth'

export default class Home extends Component {
  static propTypes = {
    filter: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired,
    isLoading: PropTypes.bool,
    fetchProducts: PropTypes.func.isRequired,
    changeFilterValue: PropTypes.func.isRequired,
    saveToFavourites: PropTypes.func.isRequired,
    saveToHistory: PropTypes.func.isRequired,
  }

  componentDidMount () {
    this.props.fetchProducts()
  }

  render () {
    const { products, isLoading, filter, fetchProducts, verifyingProduct, verifiedProduct } = this.props
    const cards = this.getCards.call(this, products)
    const groupKey = _.isEmpty(filter.filters) && _.isEmpty(filter.searchTerm) ? 'category.title' : 'subcategory.title'

    if (!isLoading) {
      if (!_.isEmpty(cards)) {
        if (isModerator) {
          return (
            <Card.Group>
              {
                products.map((product, index) => (
                  <ProductCard
                    key={product.id + '_' + index}
                    product={product}
                    style={{ height: 150 }}
                    verifyingProduct={verifyingProduct}
                    verifiedProduct={verifiedProduct}
                    onClose={fetchProducts}
                  />
                ))
              }
            </Card.Group>
          )
        } else {
          return (
            <CardGrid
              cards={cards}
              getCardComponent={this.getCardComponent.bind(this)}
              groupKey={groupKey}
            />
          )
        }
      }

      return (
        <EmptyText
          icon='shopping cart'
          title='Продукты не найдены'
        />
      )
    }

    return (<div />)
  }

  getProductCards (items) {
    const { filter } = this.props
    let cards = items

    // filter by search value
    cards = cards.filter(card => card.providerName.toLowerCase().indexOf(filter.searchTerm.toLowerCase()) >= 0)

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

    return cards
  }

  getSubcategoryCards (items) {
    let subcategoryMap = {}
    let subcategories = []

    items.forEach(card => {
      subcategoryMap[card.subcategory.id] = {
        id: card.id,
        header: card.subcategory.title,
        category: card.category,
        subcategory: card.subcategory,
      }
    })

    subcategories = _.map(subcategoryMap, subcategory => subcategory)

    return subcategories
  }

  getCards (products) {
    const { filter } = this.props

    if (_.isEmpty(filter.filters) && _.isEmpty(filter.searchTerm) && !isModerator) {
      return this.getSubcategoryCards.call(this, products)
    } else {
      return this.getProductCards.call(this, products)
    }
  }

  getCardComponent (card) {
    const { filter, saveToFavourites, saveToHistory, changeFilterValue, verifyingProduct, verifiedProduct } = this.props

    if (_.isEmpty(filter.filters) && _.isEmpty(filter.searchTerm)) {
      return (
        <Card
          link
          color='green'
          onClick={() => changeFilterValue('subcategory.title', card.subcategory.title)}
        >
          <Card.Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <Card.Header>{card.subcategory.title}</Card.Header>
          </Card.Content>
        </Card>
      )
    }

    return (
      <ProductCard
        product={card}
        style={{ flex: '0 0 25%' }}
        saveToFavourites={saveToFavourites}
        saveToHistory={saveToHistory}
        verifyingProduct={verifyingProduct}
        verifiedProduct={verifiedProduct}
      />
    )
  }
}
