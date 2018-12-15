import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button, Dropdown, Form, Modal} from 'semantic-ui-react'

class FilterModal extends Component {
  static propTypes = {
    trigger: PropTypes.node,
    filters: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    getOptions: PropTypes.func.isRequired,
    handleModalToggle: PropTypes.func.isRequired,
    handleFilterChange: PropTypes.func.isRequired,
    handleFilterReset: PropTypes.func.isRequired,
  }

  state = {
    options: {},
    values: {}
  }

  render() {
    const { trigger, open, handleApplyFilterButtonClick } = this.props

    const filterTypes = [
      {title: 'Город', key: 'city.name'},
      {title: 'Категория', key: 'category.title'},
      {title: 'Подкатегория', key: 'subcategory.title'},
      {title: 'Тип деятельности', key: 'actionType'},
      {title: 'Поставляемое количество', key: 'deliveryType'},
    ]

    return (
      <Modal
        trigger={trigger || <Button basic>Фильтр</Button>}
        open={open}
        size='tiny'
        dimmer='blurring'
        closeIcon={true}
        mountNode={document.getElementById('root')}
        onOpen={this.handleModalOpen.bind(this)}
        onClose={this.props.handleModalToggle}
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
                  <Dropdown
                    name={filter.key} placeholder={filter.title}
                    options={this.getOptions.call(this, filter.key)}
                    value={this.state.values[filter.key] || this.props.filters[filter.key] || null}
                    search selection noResultsMessage='Нет результатов.'
                    selectOnBlur={false} selectOnNavigation={false} wrapSelection={false}
                    style={{whiteSpace: 'nowrap'}}
                    onChange={(event, data) => this.handleSelectChange.call(this, event, data)}
                  />
                </Form.Field>
              ))
            }
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button basic circular content='Сбросить' onClick={this.handleResetFilterButtonClick.bind(this)}/>
          <Button
            type={'submit'}
            form={'filterForm'}
            color={'green'}
            circular
            content={'Применить'}
            onClick={handleApplyFilterButtonClick}
          />
        </Modal.Actions>
      </Modal>
    )
  }

  handleModalOpen() {
    const {filters} = this.props,
          selectedFilters = this.state.values

    this.setState({
      values: {
        ...selectedFilters,
        ...filters,
      },
    })
  }

  handleSelectChange(event, data) {
    if (data.name === 'category.title') {
      this.setState({
        values: {
          ...this.state.values,
          ['subcategory.title']: null,
        },
      })
    }

    this.setState({
      values: {
        ...this.state.values,
        [data.name]: data.value,
      }
    })
  }

  handleResetFilterButtonClick() {
    const filters = this.state.values

    for (let filter in filters) {
      if (filters.hasOwnProperty(filter)) {
        this.setState({
          values: {
            ...this.state.values,
            [filter]: null,
          },
        })
      }
    }

    this.props.handleFilterReset()
    this.props.handleModalToggle()
  }

  handleSubmit(event) {
    const filters = this.state.values

    for (let filter in filters) {
      if (filters.hasOwnProperty(filter)) {
        this.props.handleFilterChange(event, {name: filter, value: filters[filter]})
      }
    }

    this.props.handleModalToggle()
  }

  getOptions(key) {
    const {filters} = this.props
    let options = this.props.getOptions.call(this, key, this.state.values)

    return options
  }

}

export default FilterModal
