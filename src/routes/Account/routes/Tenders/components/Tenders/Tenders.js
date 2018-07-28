import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {Button, Card, Icon, Header} from 'semantic-ui-react'
import {customerUserType, getUserType} from 'utils/auth'
import EmptyText from 'components/EmptyText/EmptyText'
import TenderEditModal from './components/TenderEditModal/TenderEditModal'
import TenderViewModal from './components/TenderViewModal/TenderViewModal'
import IconList from 'components/IconList/IconList'
import moment from "moment/moment";
import {fetchTenders} from "../../modules/tenders";

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
    const {cities, categories, subcategories, items, fetchTenders, fetchCities, fetchCategories, fetchSubcategories, saveTender} = this.props
    const userType = getUserType()

    if (!_.isEmpty(items)) {
      return (
        <div style={{flex: 1}}>
          <h2>Тендеры</h2>

          <Card.Group itemsPerRow={3}>
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
                onClose={fetchTenders}
                trigger={
                  <Card
                    fluid
                    link
                    color='green'
                    style={{justifyContent: 'center'}}
                    content={
                      <Header as='h2' icon textAlign='center' color='green'>
                        <Icon name='plus' circular />
                        <Header.Content>Добавить</Header.Content>
                      </Header>
                    }
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
                        <IconList data={[
                          {icon: 'calendar', header: 'Дата', description: moment(card.expectedDate).format('DD.MM.YYYY')},
                          {icon: 'box', header: 'Количество, шт', description: +card.amount},
                          {icon: 'ruble', header: 'Стоимость, руб', description: +card.price},
                        ]}/>
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
