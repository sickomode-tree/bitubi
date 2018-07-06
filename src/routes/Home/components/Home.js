import React, { Component } from 'react'

export default class Home extends Component {
  componentDidMount() {
    fetch('/test/public/products')
      .then(response => response.json())
      .then(json => console.log(json));
  }

  render() {
    return (
      <div>
        <h4>Продукты</h4>
      </div>
    )
  }
}
