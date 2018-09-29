import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Grid } from 'semantic-ui-react'
import { getFormFieldComponent } from 'utils/form'

export default class EditForm extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.object,
    centered: PropTypes.bool,
    fields: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  render () {
    const { id, onSubmit, fields, data, centered } = this.props

    return (
      <Form
        id={id}
        onSubmit={onSubmit}
      >
        <Grid stackable centered={centered || false}>
          {
            fields.map((field, index) => (
              _.isNil(field.visible) || field.visible === true) && (
                <Grid.Column width={field.width || 16} key={index}>
                  {getFormFieldComponent(field, data)}
                </Grid.Column>
              )
            )
          }
        </Grid>
      </Form>
    )
  }
}
