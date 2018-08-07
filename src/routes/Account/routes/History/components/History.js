import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Card} from 'semantic-ui-react'
import ProductCard from 'components/ProductCard/ProductCard'
import EmptyText from 'components/EmptyText/EmptyText'
import TenderCard from 'components/TenderCard/TenderCard'
import {isCustomer, isProvider} from 'utils/auth'

export default class History extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    fetchHistory: PropTypes.func.isRequired,
    saveToFavourites: PropTypes.func.isRequired,
    resetFilter: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchHistory()
    this.props.resetFilter()
  }

  render() {
    const {items, isLoading, fetchHistory, saveToFavourites} = this.props

    if (!isLoading) {
      if (!_.isEmpty(items)) {
        return (
          <div style={{flex: 1}}>
            <h2>История</h2>

            <Card.Group itemsPerRow={3}>
              {
                isCustomer &&
                items.map(card => (
                  <ProductCard
                    key={card.id}
                    product={card}
                    style={{height: 150}}
                    onClose={fetchHistory}
                    saveToFavourites={saveToFavourites}
                  />
                ))
              }
              {
                isProvider &&
                items.map(card => (
                  <TenderCard
                    key={card.id}
                    tender={card}
                    onClose={fetchHistory}
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

    return <div></div>
  }
}
