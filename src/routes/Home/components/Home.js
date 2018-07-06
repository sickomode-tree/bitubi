import React, { Component } from 'react'

export default class Home extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    return (
      <div>
        <h2>Продукты</h2>
      </div>
    )
  }
}
