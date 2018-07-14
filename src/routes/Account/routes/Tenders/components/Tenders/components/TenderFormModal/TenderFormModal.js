import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button, Dropdown, Form, Modal, TextArea} from 'semantic-ui-react'

class TenderFormModal extends Component {
  static propTypes = {
    trigger: PropTypes.node,
    categories: PropTypes.array.isRequired,
    subcategories: PropTypes.array.isRequired,
    saveTender: PropTypes.func.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    fetchSubcategories: PropTypes.func.isRequired,
  }

  state = {
    category: null,
    subcategory: null,
  }

  componentDidMount() {
    const {fetchCategories, fetchSubcategories} = this.props

    fetchCategories()
    fetchSubcategories()
  }

  render() {
    const {categories, subcategories, trigger} = this.props
    const {category, subcategory} = this.state

    const categoryOptions = categories.map(category => ({key: category.id, value: category.id, text: category.title}))
    const subcategoryOptions = subcategories.map(subcategory => ({
      key: subcategory.id,
      value: subcategory.id,
      text: subcategory.title
    }))

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
              <Form.Field label='Категория' control={Dropdown} selection placeholder='Категория'
                          options={categoryOptions}
                          value={category}
                          onChange={this.handleSelectChange.bind(this, 'category')}
                          width={8} required/>

              <Form.Select label='Подкатегория' placeholder='Подкатегория'
                           options={subcategoryOptions}
                           value={subcategory}
                           onChange={this.handleSelectChange.bind(this, 'subcategory')}
                           width={8} required/>
            </Form.Group>
            <Form.Group>
              <Form.Input name='price' label='Ожидаемая цена' placeholder='Ожидаемая цена' width={8} type='number'/>
              <Form.Input name='endDate' label='Ожидаемая дата' placeholder='Ожидаемая дата' width={8}/>
            </Form.Group>
            <Form.Field
              control={TextArea}
              label='Комментарий'
              placeholder='Комментарий'
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button positive type='submit' form='tenderForm' icon='checkmark' labelPosition='right' content='Далее'/>
        </Modal.Actions>
      </Modal>
    )
  }

  handleSelectChange = (key, event, field) => {
    this.setState({[key]: field.value})
  }

  handleSubmit(event) {
    const {saveTender} = this.props
    const form = event.target;

    saveTender(form);
  }
}

export default TenderFormModal
