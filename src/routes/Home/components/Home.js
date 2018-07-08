import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'semantic-ui-react'

export default class Home extends Component {
  static propTypes = {
    products: PropTypes.array.isRequired,
    fetchProducts: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const { products } = this.props

    return (
      <div>
        <h2>Продукты</h2>
        <CardGrid cards={products} />
      </div>
    )
  }
}

export class CardGrid extends Component {
  render() {
    const { cards } = this.props

    return (
      <Card.Group itemsPerRow={3}>
        {
          cards.map(card =>
            <Card
              key={card.id}
              header={card.provider.name}
              meta={card.provider.city}
              description={card.description}
            />
          )
        }
      </Card.Group>
    )
  }
}
