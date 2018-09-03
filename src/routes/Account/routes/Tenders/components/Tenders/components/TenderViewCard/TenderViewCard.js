import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'semantic-ui-react'

export default class TenderViewCard extends Component {
  static propTypes = {
    header: PropTypes.string.isRequired,
    meta: PropTypes.string.isRequired,
  }

  render () {
    const { header, meta } = this.props

    return (
      <Card
        fluid
        header={header}
        meta={meta}
      />
    )
  }
}
