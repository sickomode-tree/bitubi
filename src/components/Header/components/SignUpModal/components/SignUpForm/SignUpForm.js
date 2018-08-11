import React, {Component} from 'react'
import PropTypes from 'prop-types'
import EditForm from 'components/EditForm/EditForm'

export default class SignUpForm extends Component {
  static propTypes = {
    fields: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  state = {
    fields: this.props.fields,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      fields: nextProps.fields,
    })
  }

  render() {
    const {state} = this

    return (
      <EditForm
        id='signUpForm'
        fields={state.fields}
        onSubmit={this.handleSubmit.bind(this)}
      />
    )
  }

  handleSubmit(event) {
    const {onSubmit} = this.props
    const form = event.target;

    onSubmit(form);
  }
}
