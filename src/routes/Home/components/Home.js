import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CardGrid from 'components/CardGrid/CardGrid'

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
      <CardGrid
        cards={products}
        groupKey='category.title'
      />
    )
  }
}
