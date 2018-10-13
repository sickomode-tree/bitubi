import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button, Card} from 'semantic-ui-react'
import './CardGridGroup.scss'


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
    })
  }

  render() {
    const {getCardComponent} = this.props
    const {cards} = this.state

    const cardCount = 3

    return (
      <div className={'CardGridGroup'}>
        {
          cards.length > cardCount &&
          <div className={'CardGridGroup__Button'}>
            <Button
              onClick={this.showPreviousCard.bind(this)}
              fluid icon='angle up' basic
            />
          </div>
        }
        <div className={'CardGridGroup__Content'}>
          {
            cards.map((card, index) => {
              let CardComponent = () => getCardComponent(card)

              return (
                <CardComponent key={index}/>
              )
            })
          }
        </div>
        {
          cards.length > cardCount &&
          <div className={'CardGridGroup__Button'}>
            <Button
              className={'CardGridGroup__Button'}
              onClick={this.showNextCard.bind(this)}
              fluid icon='angle down' basic
            />
          </div>
        }
      </div>
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
