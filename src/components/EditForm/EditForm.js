import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {Button, Input, Form, Modal, TextArea} from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import {getFormFieldComponent} from 'utils/form'

export default class EditForm extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.object,
    fields: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  render() {
    const {id, onSubmit, fields, data} = this.props

    return (
      <Form
        id={id}
        onSubmit={onSubmit}
      >
        {/*<Form.Group>*/}
          {
            fields.map(field => {
              return getFormFieldComponent(field, data)
            })
          }
        {/*</Form.Group>*/}
      </Form>
    )
  }
}
