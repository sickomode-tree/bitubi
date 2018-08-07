import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment/moment'
import _ from 'lodash'
import {Button, Card, Icon, Header, Progress} from 'semantic-ui-react'
import {customerUserType, getUserType, isProvider} from 'utils/auth'
import EmptyText from 'components/EmptyText/EmptyText'
import TenderEditModal from './components/TenderEditModal/TenderEditModal'
import TenderViewModal from './components/TenderViewModal/TenderViewModal'
import IconList from 'components/IconList/IconList'

export default class Tenders extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    cities: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    subcategories: PropTypes.array.isRequired,
    fetchTenders: PropTypes.func.isRequired,
    saveTender: PropTypes.func.isRequired,
    saveToFavourites: PropTypes.func.isRequired,
    saveToHistory: PropTypes.func.isRequired,
    deleteTender: PropTypes.func.isRequired,
    toggleTender: PropTypes.func.isRequired,
    resetFilter: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchTenders()
    this.props.resetFilter()
  }

  render() {
    const {
      cities, categories, subcategories, items,
      fetchTenders, fetchCities, fetchCategories, fetchSubcategories,
      saveTender, toggleTender, saveToFavourites, saveToHistory,
    } = this.props
    const userType = getUserType()

    if (!_.isEmpty(items)) {
      return (
        <div style={{flex: 1}}>
          <h2>Тендеры</h2>

          <Card.Group itemsPerRow={3} doubling stackable>
            {
              userType === customerUserType &&
              <TenderEditModal
                cities={cities}
                categories={categories}
                subcategories={subcategories}
                fetchCities={fetchCities}
                fetchCategories={fetchCategories}
                fetchSubcategories={fetchSubcategories}
                onSubmit={saveTender}
                onClose={fetchTenders}
                trigger={
                  <Card
                    fluid
                    link
                    color='green'
                    style={{justifyContent: 'center'}}
                    content={
                      <Header as='h2' icon textAlign='center' color='green'>
                        <Icon name='plus' circular/>
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
                  saveToFavourites={saveToFavourites}
                  onOpen={() => (isProvider && !_.isNil(saveToHistory)) ? saveToHistory(card.id) : null}
                  onClose={fetchTenders}
                  trigger={
                    <Card
                      fluid
                      className={card.disabled ? 'disabled' : null}
                    >
                      <Card.Content>
                        <Card.Header>{card.title}</Card.Header>
                      </Card.Content>
                      <Card.Content>
                        <IconList data={[
                          {
                            icon: 'calendar',
                            header: 'Ожидаемая дата',
                            description: moment(card.expectedDate).format('DD.MM.YYYY')
                          },
                          {icon: 'box', header: 'Количество, шт', description: +card.amount},
                          {icon: 'ruble', header: 'Стоимость, руб', description: +card.price},
                        ]}/>
                      </Card.Content>
                      {
                        userType === 'customer' &&
                        <Card.Content extra>
                          <Button.Group basic size='small'>
                            <Button
                              color='red'
                              icon='trash alternate outline'
                              onClick={this.handleDeleteTender.bind(this, card.id)}
                            />
                            {
                              !card.disabled &&
                              <TenderEditModal
                                tender={card}
                                cities={cities}
                                categories={categories}
                                subcategories={subcategories}
                                fetchCities={fetchCities}
                                fetchCategories={fetchCategories}
                                fetchSubcategories={fetchSubcategories}
                                onSubmit={saveTender}
                                onClose={fetchTenders}
                                trigger={
                                  <Button
                                    color='grey'
                                    icon='pencil alternate'
                                    onClick={this.handleEditTender.bind(this, card.id)}
                                  />
                                }
                              />
                            }
                          </Button.Group>{' '}
                          {
                            !card.disabled &&
                            <Button
                              basic
                              color='blue'
                              content='Завершить'
                              floated='right'
                              onClick={this.handleToggleTender.bind(this, card.id)}
                            />
                          }
                          {
                            card.disabled &&
                            <Button
                              basic
                              content='Восстановить'
                              floated='right'
                              onClick={this.handleToggleTender.bind(this, card.id)}
                            />
                          }
                        </Card.Content>
                      }
                      <Progress percent={100 - card.totalDays / card.daysToGo * 100} attached='bottom'/>
                    </Card>
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
            onSubmit={saveTender}
            onClose={fetchTenders}
            trigger={
              <Button positive>Добавить тендер</Button>
            }
          />
        }
      />
    )
  }


  handleDeleteTender(id, event) {
    const {fetchTenders, deleteTender} = this.props

    event.preventDefault()
    event.stopPropagation()

    deleteTender(id)
    fetchTenders()
  }

  handleToggleTender(id, event) {
    const {fetchTenders, toggleTender} = this.props

    event.preventDefault()
    event.stopPropagation()

    toggleTender(id)
    fetchTenders()
  }

  handleEditTender(id, event) {
    event.preventDefault()
    event.stopPropagation()
  }
}
