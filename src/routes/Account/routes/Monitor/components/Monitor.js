import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Card} from 'semantic-ui-react'
import ProductCard from 'components/ProductCard/ProductCard'
import EmptyText from 'components/EmptyText/EmptyText'
import TenderCard from 'components/TenderCard/TenderCard'
import {isCustomer, isProvider} from 'utils/auth'

export default class Monitor extends Component {
  static propTypes = {
    products: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    fetchProducts: PropTypes.func.isRequired,
    acceptProduct: PropTypes.func.isRequired,
    declineProduct: PropTypes.func.isRequired,
    resetFilter: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchProducts()
    // this.props.resetFilter()
  }

  render() {
    const {products, isLoading, fetchProducts, acceptProduct, declineProduct, verifyProduct} = this.props

    if (!isLoading) {
      if (!_.isEmpty(products)) {
        return (
          <div style={{flex: 1}}>
            <h2>Монитор</h2>

            <Card.Group itemsPerRow={3}>
              {
                isCustomer &&
                products.map(card => (
                  <ProductCard
                    key={card.id + Math.random()}
                    product={card}
                    style={{height: 150}}
                    acceptProduct={acceptProduct}
                    declineProduct={declineProduct}
                    verifyProduct={verifyProduct}
                    onClose={fetchProducts}
                  />
                ))
              }
              {
                isProvider &&
                products.map(card => (
                  <TenderCard
                    key={card.id}
                    tender={card}
                    onClose={fetchProducts}
                  />
                ))
              }
            </Card.Group>
          </div>
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
}
