import React, {Component} from 'react'
import PropType from 'prop-types'
import {Icon, Header} from 'semantic-ui-react'

export default class EmptyText extends Component {
  static propTypes = {
    icon: PropType.string,
    primaryText: PropType.string,
    secondaryText: PropType.string,
  }

  render() {
    const {icon, primaryText} = this.props

    return (
      <Header as='h2' icon textAlign='center' color='grey'
              style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 500}}>
        <Icon name={icon} size='huge' circular style={{marginBottom: '1.5rem'}}/>
        <Header.Content>{primaryText}</Header.Content>
      </Header>
    )
  }
}
