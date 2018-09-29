import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button, Card} from 'semantic-ui-react'

export default class CardGridGroup extends Component {
  static propTypes = {
    cards: PropTypes.array.isRequired,
    getCardComponent: PropTypes.func.isRequired,
  }

  state = {
    cards: this.props.cards,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cards: nextProps.cards,
      cardCount: 3,
    })
  }

  render() {
    const {getCardComponent} = this.props
    const {cards, cardCount} = this.state

    return (
      <Card.Group
        itemsPerRow={1}
        style={{
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: cards.length >= cardCount ? 'space-around' : 'flex-start',
          height: '100%',
          padding: '1em',
        }}
      >
        {
          cards.length > cardCount &&
          <Button
            onClick={this.showPreviousCard.bind(this)}
            style={{position: 'absolute', top: 0, boxShadow: 'none'}}
            fluid icon='angle up' basic
          />
        }
        {
          cards.length > cardCount &&
          <Button
            onClick={this.showNextCard.bind(this)}
            style={{position: 'absolute', bottom: 0, boxShadow: 'none'}}
            fluid icon='angle down' basic
          />
        }
        {
          cards.map((card, index) => {
            let CardComponent = () => getCardComponent(card)

            return (
              <CardComponent key={index}/>
            )
          })
        }
      </Card.Group>
    )
  }

  showPreviousCard() {
    const {cards} = this.state

    cards.unshift(cards.pop())

    this.setState({
      cards,
    })
  }

  showNextCard() {
    const {cards} = this.state

    cards.push(cards.shift())

    this.setState({
      cards,
    })
  }
}
