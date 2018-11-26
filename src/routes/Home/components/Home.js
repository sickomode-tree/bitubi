import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Card as SUICard } from 'semantic-ui-react'
import Card from 'components/Card/Card'
import CardGrid from 'components/CardGrid/CardGrid'
import ProductCard from 'components/ProductCard/ProductCard'
import EmptyText from 'components/EmptyText/EmptyText'
import { getObjectValue } from 'utils/array'

export default class Home extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
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
    const { auth, products, isLoading, filter, fetchProducts, verifyingProduct, verifiedProduct } = this.props
    const cards = this.getCards.call(this, products)
    const groupKey = _.isEmpty(filter.filters) && _.isEmpty(filter.searchTerm) ? 'category.title' : 'subcategory.title'

    const isModerator = auth.userType === 'moderator'

    if (!isLoading) {
      if (!_.isEmpty(cards)) {
        if (isModerator) {
          return (
            <div style={{ flex: 1, maxWidth: 1400, margin: '0 auto', padding: '0 50px' }}>
              <h2>Продукты</h2>
              <SUICard.Group itemsPerRow={3}>
                {
                  products.map((product, index) => (
                    <ProductCard
                      key={product.id + '_' + index}
                      auth={auth}
                      product={product}
                      style={{ height: 150 }}
                      verifyingProduct={verifyingProduct}
                      verifiedProduct={verifiedProduct}
                      onClose={fetchProducts}
                    />
                  ))
                }
              </SUICard.Group>
            </div>
          )
        } else {
          return (
            <CardGrid
              cards={ cards }
              getCardComponent={ this.getCardComponent.bind(this) }
              groupKey={ groupKey }
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

  getProductCards(items) {
    const {filter} = this.props
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

  getSubcategoryCards(items) {
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

  getCards(products) {
    const {auth, filter} = this.props
    const isModerator = auth.userType === 'moderator'

    if (_.isEmpty(filter.filters) && _.isEmpty(filter.searchTerm) && !isModerator) {
      return this.getSubcategoryCards.call(this, products)
    } else {
      return this.getProductCards.call(this, products)
    }
  }

  getCardComponent(card) {
    const {filter, saveToFavourites, saveToHistory, changeFilterValue, verifyingProduct, verifiedProduct} = this.props

    if (_.isEmpty(filter.filters) && _.isEmpty(filter.searchTerm)) {
      return (
        <Card
          inverted
          align={'center'}
          onClick={() => changeFilterValue('subcategory.title', card.subcategory.title)}
          imagePath={card.subcategory.pic}
        >
          <div>
            <h3 className={'Card__Heading'}>{card.subcategory.title}</h3>
          </div>
        </Card>
      )
    }

    return (
      <ProductCard
        product={card}
        auth={this.props.auth}
        saveToFavourites={saveToFavourites}
        saveToHistory={saveToHistory}
        verifyingProduct={verifyingProduct}
        verifiedProduct={verifiedProduct}
      />
    )
  }
}
