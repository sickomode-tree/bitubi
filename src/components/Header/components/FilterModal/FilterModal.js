import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Dropdown, Form, Modal } from 'semantic-ui-react'

class FilterModal extends Component {
  static propTypes = {
    trigger: PropTypes.node,
    filters: PropTypes.object.isRequired,
    getOptions: PropTypes.func.isRequired,
    handleFilterChange: PropTypes.func.isRequired,
    handleResetFilterButtonClick: PropTypes.func.isRequired,
  }

  render () {
    const { filters, trigger, getOptions, handleFilterChange, handleResetFilterButtonClick } = this.props

    const filterTypes = [
      { title: 'Город', key: 'city.name' },
      { title: 'Категория', key: 'category.title' },
      { title: 'Подкатегория', key: 'subcategory.title' },
      { title: 'Тип деятельности', key: 'actionType' },
      { title: 'Поставляемое количество', key: 'deliveryType' },
    ]

    return (
      <Modal
        trigger={trigger || <Button basic>Фильтр</Button>}
        size='tiny'
        dimmer='blurring'
        closeIcon={true}
      >
        <Modal.Header>Фильтр</Modal.Header>
        <Modal.Content>
          <Form
            id='filterForm'
            onSubmit={this.handleSubmit.bind(this)}
          >
            {
              filterTypes.map(filter => (
                <Form.Field key={filter.key}>
                  <Dropdown name={filter.key} placeholder={filter.title}
                    options={getOptions.call(this, filter.key)} value={filters[filter.key] || null}
                    search selection noResultsMessage='Нет результатов.'
                    selectOnBlur={false} selectOnNavigation={false} wrapSelection={false}
                    style={{ whiteSpace: 'nowrap' }}
                    onChange={(event, data) => handleFilterChange(event, data)}
                  />
                </Form.Field>
              ))
            }
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color={'red'} circular   content='Сбросить' onClick={handleResetFilterButtonClick} />
        </Modal.Actions>
      </Modal>
    )
  }

  handleUserTypeSelectChange (userType) {
    this.setState({ selectedUserType: userType })
  }

  handleSubmit (event) {
    const { handleSignUp } = this.props
    const form = event.target

    handleSignUp(form)
  }
}

export default FilterModal
