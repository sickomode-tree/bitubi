import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Card} from 'semantic-ui-react'
import EmptyText from 'components/EmptyText/EmptyText'
import ProductCard from 'components/ProductCard/ProductCard'

export default class Favourites extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    fetchFavourites: PropTypes.func.isRequired,
    saveToFavourites: PropTypes.func.isRequired,
    resetFilter: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchFavourites()
    this.props.resetFilter()
  }

  render() {
    const {items, fetchFavourites, saveToFavourites} = this.props

    if (!_.isEmpty(items)) {
      return (
        <div style={{flex: 1}}>
          <h2>Закладки</h2>
          <Card.Group itemsPerRow={3}>
            {
              items.map(card => (
                <ProductCard
                  key={card.id}
                  product={card}
                  style={{height: 150}}
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
}
