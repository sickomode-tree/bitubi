import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Card} from 'semantic-ui-react'
import EmptyText from 'components/EmptyText/EmptyText'

export default class Favourites extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    fetchFavourites: PropTypes.func.isRequired,
    resetFilter: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchFavourites()
    this.props.resetFilter()
  }

  render() {
    const {items} = this.props

    if (!_.isEmpty(items)) {
      return (
        <div style={{flex: 1}}>
          <h2>Закладки</h2>
          <Card.Group itemsPerRow={2}>
            {
              items.map(card => (
                <Card
                  fluid
                  key={card.id}
                  header={card.provider.name}
                  meta={card.provider.city}
                  description={card.description}
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
        primaryText='Здесь появятся сохраненные карточки'
      />
    )
  }
}
