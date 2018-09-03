import React, { Component } from 'react'
import PropType from 'prop-types'
import { Icon, Header } from 'semantic-ui-react'

export default class EmptyText extends Component {
  static propTypes = {
    actions: PropType.node,
    icon: PropType.string,
    title: PropType.string,
    secondaryText: PropType.string,
  }

  render () {
    const { icon, title, actions } = this.props

    return (
      <Header as='h2' icon textAlign='center' color='grey'
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 500 }}>
        <Icon name={icon} size='huge' circular style={{ marginBottom: '1.5rem' }} />
        <Header.Content style={{ marginBottom: '1.5rem' }}>{title}</Header.Content>
        {actions}
      </Header>
    )
  }
}
