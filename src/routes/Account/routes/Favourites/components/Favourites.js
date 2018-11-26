import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Card } from 'semantic-ui-react'
import EmptyText from 'components/EmptyText/EmptyText'
import ProductCard from 'components/ProductCard/ProductCard'
import TenderCard from 'components/TenderCard/TenderCard'

export default class Favourites extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    fetchFavourites: PropTypes.func.isRequired,
    saveToFavourites: PropTypes.func.isRequired,
    resetFilter: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }

  componentDidMount () {
    this.props.fetchFavourites()
    this.props.resetFilter()
  }

  render () {
    const {auth, items, isLoading, fetchFavourites, saveToFavourites} = this.props

    const isProvider = auth.userType === 'provider',
      isCustomer = auth.userType === 'customer'

    if (!isLoading) {
      if (!_.isEmpty(items)) {
        return (
          <div style={{flex: 1, maxWidth: 1400, margin: '0 auto' }}>
            <h2>Закладки</h2>
            <Card.Group itemsPerRow={3}>
              {
                isCustomer &&
                items.map(card => (
                  <ProductCard
                    key={card.id}
                    auth={auth}
                    product={card}
                    style={{height: 150}}
                    onClose={fetchFavourites}
                    saveToFavourites={saveToFavourites}
                  />
                ))
              }
              {
                isProvider &&
                items.map(card => (
                  <TenderCard
                    key={card.id}
                    auth={auth}
                    tender={card}
                    onClose={fetchFavourites}
                    saveToFavourites={saveToFavourites}
                  />
                ))
              }
            </Card.Group>
          </div>
        )
      }

      return (
        <EmptyText
          icon='star outline'
          title='Здесь появятся сохраненные карточки'
        />
      )
    }

    return <div />
  }
}
