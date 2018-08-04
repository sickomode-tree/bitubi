import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Form, Grid} from 'semantic-ui-react'
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
        <Grid>
          {
            fields.map(field => (
              <Grid.Column width={field.width || 16} key={field.name}>
                {getFormFieldComponent(field, data)}
              </Grid.Column>
            ))
          }
        </Grid>
      </Form>
    )
  }
}
