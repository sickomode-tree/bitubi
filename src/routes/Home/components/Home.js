import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Grid } from 'semantic-ui-react'

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
  static propTypes = {
    cards: PropTypes.array.isRequired,
  }

  render() {
    const { cards } = this.props

    return (
      <Grid columns={3} divided>
        <Grid.Row>
          <Grid.Column>
            <CardGridGroup cards={cards}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export class CardGridGroup extends Component {
  static propTypes = {
    cards: PropTypes.array.isRequired,
  }

  render() {
    const { cards } = this.props

    return (
      <Card.Group itemsPerRow={1}>
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
