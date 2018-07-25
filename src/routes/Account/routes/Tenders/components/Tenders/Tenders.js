import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Button, Card} from 'semantic-ui-react'
import {customerUserType, getUserType} from 'utils/auth'
import EmptyText from 'components/EmptyText/EmptyText'
import TenderEditModal from './components/TenderEditModal/TenderEditModal'
import TenderViewModal from './components/TenderViewModal/TenderViewModal'
import TenderViewCard from './components/TenderViewCard/TenderViewCard'
import Tag from 'components/Tag/Tag'

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
              <TenderEditModal
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
                <TenderViewModal
                  key={card.id}
                  tender={card}
                  trigger={
                    <Card
                      fluid
                      header={card.title}
                      meta={
                        <div>
                          <Tag icon='tags' content={card.category}/>
                          <Tag icon='tag' content={card.subcategory}/>
                        </div>
                      }
                    />
                  }
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
          <TenderEditModal
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
