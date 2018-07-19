import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Button, Card} from 'semantic-ui-react'
import {customerUserType, getUserType} from 'utils/auth'
import EmptyText from 'components/EmptyText/EmptyText'
import TenderFormModal from './components/TenderFormModal/TenderFormModal'

export default class Tenders extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    cities: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    subcategories: PropTypes.array.isRequired,
    fetchTenders: PropTypes.func.isRequired,
    saveTender: PropTypes.func.isRequired,
    resetFilter: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchTenders()
    this.props.resetFilter()
  }

  render() {
    const {cities, categories, subcategories, items, fetchCities, fetchCategories, fetchSubcategories, saveTender} = this.props
    const userType = getUserType()

    if (!_.isEmpty(items)) {
      return (
        <div style={{flex: 1}}>
          <h2>Тендеры</h2>

          <Card.Group itemsPerRow={2}>
            {
              userType === customerUserType &&
              <TenderFormModal
                cities={cities}
                categories={categories}
                subcategories={subcategories}
                fetchCities={fetchCities}
                fetchCategories={fetchCategories}
                fetchSubcategories={fetchSubcategories}
                saveTender={saveTender}
                trigger={
                  <Card
                    fluid
                    link
                    header='Создать тендер'
                  />
                }
              />
            }
            {
              items.map(card => (
                <Card
                  fluid
                  key={card.id}
                  header={card.title}
                  meta={card.category + ' ' + card.subcategory}
                  description={card.description}
                />
              ))
            }
          </Card.Group>
        </div>
      )
    }

    return (
      <EmptyText
        icon='shopping cart'
        title='Здесь появятся тендеры'
        actions={
          userType === customerUserType &&
          <TenderFormModal
            cities={cities}
            categories={categories}
            subcategories={subcategories}
            fetchCities={fetchCities}
            fetchCategories={fetchCategories}
            fetchSubcategories={fetchSubcategories}
            saveTender={saveTender}
            trigger={
              <Button positive>Добавить тендер</Button>
            }
          />
        }
      />
    )
  }
}
