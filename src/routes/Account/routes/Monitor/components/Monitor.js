import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Card} from 'semantic-ui-react'
import ProductCard from 'components/ProductCard/ProductCard'
import EmptyText from 'components/EmptyText/EmptyText'
import TenderCard from 'components/TenderCard/TenderCard'
import {isCustomer, isProvider} from 'utils/auth'
import CardGrid from 'components/CardGrid/CardGrid'

export default class Monitor extends Component {
  static propTypes = {
    products: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    fetchProducts: PropTypes.func.isRequired,
    acceptProduct: PropTypes.func.isRequired,
    declineProduct: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const {products, isLoading, fetchProducts, acceptProduct, declineProduct, verifyProduct} = this.props

    if (!isLoading) {
      if (!_.isEmpty(products)) {
        return (
            <CardGrid
              cards={products}
              getCardComponent={this.getCardComponent.bind(this)}
              groupKey='favourite'
              groupCount={2}
            />
        )
      }

      return (
        <EmptyText
          icon='shield'
          title='Запросов на модерацию нет'
        />
      )
    }

    return <div></div>
  }

  getCardComponent(card) {
    const {acceptProduct, declineProduct, verifyProduct, fetchProducts} = this.props

    if (isProvider) {
      return (
        <TenderCard
          key={card.id}
          tender={card}
          onClose={fetchProducts}
        />
      )
    }

    return (
      <ProductCard
        key={card.id + Math.random()}
        product={card}
        style={{height: 150}}
        acceptProduct={acceptProduct}
        declineProduct={declineProduct}
        verifyProduct={verifyProduct}
        onClose={fetchProducts}
      />
    )
  }
}
