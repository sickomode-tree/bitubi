import React, {Component} from "react";
import PropTypes from "prop-types";
import { Card } from 'semantic-ui-react'

export default class CardGridGroup extends Component {
  static propTypes = {
    cards: PropTypes.array.isRequired,
  }

  render() {
    const { cards } = this.props

    return (
      <Card.Group itemsPerRow={1} style={{overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', padding: '1em'}}>
        {
          cards.map(card =>
            <Card
              key={card.id}
              header={card.provider.name}
              meta={card.provider.city}
              description={card.description}
              style={{flex: '0 1 25%'}}
            />
          )
        }
      </Card.Group>
    )
  }
}
