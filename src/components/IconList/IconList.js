import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {List} from 'semantic-ui-react'

export default class IconList extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    color: PropTypes.string,
  }

  render() {
    const {data, color} = this.props

    return (
      <List divided relaxed>
        {
          data.map((item, index) => (
            <List.Item key={index}>
              <List.Icon name={item.icon} size='large' color={color || 'green'} verticalAlign='middle'/>
              <List.Content>
                <List.Header style={{marginBottom: 3}}>{item.header}</List.Header>
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
