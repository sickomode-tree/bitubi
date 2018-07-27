import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Card} from 'semantic-ui-react'
import ProductCard from 'components/ProductCard/ProductCard'
import EmptyText from 'components/EmptyText/EmptyText'

export default class History extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    fetchHistory: PropTypes.func.isRequired,
    saveToFavourites: PropTypes.func.isRequired,
    resetFilter: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchHistory()
    this.props.resetFilter()
  }

  render() {
    const {items, saveToFavourites} = this.props

    if (!_.isEmpty(items)) {
      return (
        <div style={{flex: 1}}>
          <h2>История</h2>

          <Card.Group itemsPerRow={2}>
            {
              items.map(card => (
                <ProductCard
                  product={card}
                  style={{height: 150}}
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
        icon='history'
        title='Здесь появится история просмотренных карточек'
      />
    )
  }
}
