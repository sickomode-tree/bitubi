import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Card} from 'semantic-ui-react'

export default class CardGridGroup extends Component {
  static propTypes = {
    cards: PropTypes.array.isRequired,
    getCardComponent: PropTypes.func.isRequired,
  }

  render() {
    const {cards, getCardComponent} = this.props

    return (
      <Card.Group itemsPerRow={1} style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '1em',
      }}>
        {
          cards.map(card => {
            let CardComponent = () => getCardComponent(card)
            console.log(CardComponent())
            return (
              <CardComponent key={card.id} />
            )
          })
        }
      </Card.Group>
    )
  }
}
