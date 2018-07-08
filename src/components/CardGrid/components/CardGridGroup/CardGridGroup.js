import React, {Component} from "react";
import PropTypes from "prop-types";
import { Card, Segment } from 'semantic-ui-react'

export default class CardGridGroup extends Component {
  static propTypes = {
    cards: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
  }

  render() {
    const { cards, title } = this.props

    return (
      <Card.Group itemsPerRow={1} className='d-flex h-100 p-1' style={{flexDirection: 'column'}}>
        {
          cards.map(card =>
            <Card
              key={card.id}
              header={card.provider.name}
              meta={card.provider.city}
              description={card.description}
              style={{flex: '1 0 25%'}}
            />
          )
        }
      </Card.Group>
    )
  }
}
