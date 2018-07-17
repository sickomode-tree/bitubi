import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button, Form, Modal, TextArea} from 'semantic-ui-react'

class TenderFormModal extends Component {
  static propTypes = {
    trigger: PropTypes.node,
    saveTender: PropTypes.func.isRequired,
  }

  state = {
    category: null,
    subcategory: null,
    categories: [],
    subcategories: [],
  }

  componentDidMount() {
    fetch('/test/public/categories')
      .then(res => res.json())
      .then(json => {
        this.setState({
          categories: json.map(category => ({
            value: category.id,
            text: category.title,
          }))
        })
      })

    fetch('/test/public/subcategories')
      .then(res => res.json())
      .then(json => {
        this.setState({
          subcategories: json.map(subcategory => ({
            value: subcategory.id,
            text: subcategory.title,
            parent: subcategory.parent.id,
          }))
        })
      })
  }

  render() {
    const {trigger} = this.props
    const {categories, category, subcategories, subcategory} = this.state

    return (
      <Modal
        trigger={trigger || <Button basic color='green'>Создать тендер</Button>}
        size='tiny'
        className='scrolling'
        style={{height: 'fit-content'}}
      >
        <Modal.Header>Создать тендер</Modal.Header>
        <Modal.Content>
          <Form
            id='tenderForm'
            onSubmit={this.handleSubmit.bind(this)}
          >
            <Form.Input name='title' label='Название' placeholder='Название' required/>
            <Form.Input name='amount' label='Количество' placeholder='Количество' type='number' required/>
            <Form.Group>
              <Form.Select name='category' label='Категория' options={categories} value={category}
                           placeholder='Категория' width={8} required onChange={this.handleSelectChange.bind(this)}/>
              <input type='hidden' name='category' value={category}/>
              <Form.Select name='subcategory' label='Подкатегория' options={subcategories.filter(subcategory => subcategory.parent === category)} value={subcategory}
                           placeholder='Подкатегория' width={8} required onChange={this.handleSelectChange.bind(this)}
                           disabled={_.isNil(category)}/>
              <input type='hidden' name='subcategory' value={subcategory}/>
            </Form.Group>
            <Form.Group>
              <Form.Input name='price' label='Ожидаемая цена' placeholder='Ожидаемая цена' width={8} type='number'/>
              <Form.Input name='endDate' label='Ожидаемая дата' placeholder='Ожидаемая дата' width={8}/>
            </Form.Group>
            <Form.Field
              control={TextArea}
              name='comment'
              label='Комментарий'
              placeholder='Комментарий'
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button positive type='submit' form='tenderForm' icon='checkmark' labelPosition='right' content='Создать'/>
        </Modal.Actions>
      </Modal>
    )
  }

  handleSubmit(event) {
    const {saveTender} = this.props
    const form = event.target

    saveTender(form)
  }

  handleSelectChange(event, field) {
    this.setState({[field.name]: field.value})
  }
}

export default TenderFormModal
