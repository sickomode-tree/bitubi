import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {List} from 'semantic-ui-react'

export default class IconList extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
  }

  render() {
    const {data} = this.props

    return (
      <List divided relaxed>
        {
          data.map((item, index) => (
            <List.Item key={index}>
              <List.Icon name={item.icon} size='large' verticalAlign='middle' />
              <List.Content>
                <List.Header>{item.header}</List.Header>
                <List.Description>
                  {item.description ? item.description : '--'}
                </List.Description>
              </List.Content>
            </List.Item>
          ))
        }
      </List>
    )
  }
}
