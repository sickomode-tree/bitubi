import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Label, Popup} from 'semantic-ui-react'

export default class Tag extends Component {
  static propTypes = {
    icon: PropTypes.string,
    content: PropTypes.string.isRequired,
  }

  render() {
    const {content, icon} = this.props

    return (
      <Popup
        content={content}
        trigger={
          <Label
            icon={icon}
            content={content}
            style={{maxWidth: 220, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}
          />
        }
      />
    )
  }
}
