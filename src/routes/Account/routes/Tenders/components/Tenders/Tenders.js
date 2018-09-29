import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment/moment'
import _ from 'lodash'
import { Button, Card, Icon, Header, Progress } from 'semantic-ui-react'
import EmptyText from 'components/EmptyText/EmptyText'
import TenderEditModal from './components/TenderEditModal/TenderEditModal'
import TenderViewModal from './components/TenderViewModal/TenderViewModal'
import IconList from 'components/IconList/IconList'
import CardGrid from 'components/CardGrid/CardGrid'
import TenderCard from 'components/TenderCard/TenderCard'
import { isProvider, isCustomer, isModerator } from 'utils/auth'
import { verifyingTender } from '../../modules/tenders'

export default class Tenders extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    cities: PropTypes.array.isRequired,
    categories: PropTypes.array.isRequired,
    fetchCategories: PropTypes.func.isRequired,
    fetchCities: PropTypes.func.isRequired,
    fetchTenders: PropTypes.func.isRequired,
    saveTender: PropTypes.func.isRequired,
    saveToFavourites: PropTypes.func.isRequired,
    saveToHistory: PropTypes.func.isRequired,
    deleteTender: PropTypes.func.isRequired,
    toggleTender: PropTypes.func.isRequired,
    verifyingTender: PropTypes.func,
    verifiedTender: PropTypes.func,
    changeFilterValue: PropTypes.func.isRequired,
    resetFilter: PropTypes.func.isRequired,
  }

  componentDidMount () {
    this.props.fetchCategories()
    this.props.fetchCities()
    this.props.fetchTenders()
  }

  render () {
    const {
      cities, categories, items, filter,
      fetchTenders, fetchCities, fetchCategories,
      saveTender, saveToFavourites, saveToHistory,
      verifyingTender, verifiedTender,
    } = this.props
    const cards = this.getCards.call(this, items)
    const groupKey = _.isEmpty(filter.filters) && _.isEmpty(filter.searchTerm) ? 'category.title' : 'subcategory.title'

    if (!_.isEmpty(items)) {
      if (isCustomer) {
        return (
          <div style={{ flex: 1 }}>
            <h2>Тендеры</h2>

            <Card.Group itemsPerRow={3} doubling stackable>
              <TenderEditModal
                cities={cities}
                categories={categories}
                fetchCities={fetchCities}
                fetchCategories={fetchCategories}
                onSubmit={saveTender}
                onClose={fetchTenders}
                trigger={
                  <Card
                    fluid
                    link
                    color='green'
                    style={{ justifyContent: 'center' }}
                    content={
                      <Header as='h2' icon textAlign='center' color='green'>
                        <Icon name='plus' circular />
                        <Header.Content>Добавить</Header.Content>
                      </Header>
                    }
                  />
                }
              />
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
                        color={card.disabled ? null : 'green'}
                        className={card.disabled ? 'disabled' : null}
                      >
                        <Card.Content>
                          <Card.Header>
                            {card.title}
                            {card.verified === false &&
                            <i className='right floated ban icon red' />
                            }
                          </Card.Header>
                        </Card.Content>
                        <Card.Content>
                          <IconList color={card.disabled ? 'grey' : 'green'} data={[
                            {
                              icon: 'calendar',
                              header: 'Ожидаемая дата',
                              description: moment(card.expectedDate).format('DD.MM.YYYY')
                            },
                            { icon: 'box', header: 'Количество, шт', description: +card.amount },
                            { icon: 'ruble', header: 'Стоимость, руб', description: +card.price },
                          ]} />
                        </Card.Content>
                        {
                          isCustomer &&
                          <Card.Content extra>
                            <Button.Group circular size='small'>
                              <Button circular
                                color={card.disabled ? null : 'green'}
                                icon='trash alternate outline'
                                onClick={this.handleDeleteTender.bind(this, card.id)}
                              />
                              {
                                // TODO: исправить ошибку
                                !card.disabled &&
                                <TenderEditModal
                                  tender={card}
                                  cities={cities}
                                  categories={categories}
                                  fetchCities={fetchCities}
                                  fetchCategories={fetchCategories}
                                  onSubmit={saveTender}
                                  onClose={fetchTenders}
                                  trigger={
                                    <Button circular
                                      color='green'
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
                                color='red'
                                circular
                                content='Завершить'
                                floated='right'
                                onClick={this.handleToggleTender.bind(this, card.id)}
                              />
                            }
                            {
                              card.disabled &&
                              <Button
                                color={card.disabled ? null : 'green'}
                                content='Восстановить'
                                floated='right'
                                onClick={this.handleToggleTender.bind(this, card.id)}
                              />
                            }
                          </Card.Content>
                        }
                        <Progress percent={100 - card.totalDays / card.daysToGo * 100} attached='bottom' />
                      </Card>
                    }
                  />
                ))
              }
            </Card.Group>
          </div>
        )
      } else if (isProvider) {
        return (
          <CardGrid
            cards={cards}
            getCardComponent={this.getCardComponent.bind(this)}
            groupKey={groupKey}
          />
        )
      } else if (isModerator) {
        return (
          <Card.Group>
            {
              cards.map((card, index) => (
                <TenderCard
                  key={index}
                  tender={card}
                  style={{ height: 150 }}
                  verifyingTender={verifyingTender}
                  verifiedTender={verifiedTender}
                  onClose={fetchTenders}
                />
              ))
            }
          </Card.Group>
        )
      }
    }

    return (
      <EmptyText
        icon='shopping cart'
        title='Здесь появятся тендеры'
        actions={
          isCustomer &&
          <TenderEditModal
            cities={cities}
            categories={categories}
            fetchCities={fetchCities}
            fetchCategories={fetchCategories}
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

  handleDeleteTender (id, event) {
    const { fetchTenders, deleteTender } = this.props

    event.preventDefault()
    event.stopPropagation()

    deleteTender(id)
      .then(() => fetchTenders())
  }

  handleToggleTender (id, event) {
    const { fetchTenders, toggleTender } = this.props

    event.preventDefault()
    event.stopPropagation()

    toggleTender(id)
      .then(() => fetchTenders())
  }

  handleEditTender (id, event) {
    event.preventDefault()
    event.stopPropagation()
  }

  getTenderCards (items) {
    const { filter } = this.props
    let cards = items

    // filter by search value
    cards = cards.filter(card => card.title.toLowerCase().indexOf(filter.searchTerm.toLowerCase()) >= 0)

    if (!_.isEmpty(filter.filters)) {
      let isFilterTrue = false
      cards = _.filter(cards, card => {
        _.forIn(filter.filters, (filterValue, filterName) => {
          let cardValue = card

          filterName.split('.').forEach(key => {
            cardValue = cardValue[key]
          })

          isFilterTrue = cardValue === filterValue

          return isFilterTrue
        })
        return isFilterTrue
      })
    }

    return cards
  }

  getSubcategoryCards (items) {
    let subcategoryMap = {}
    let subcategories = []

    items.forEach(card => {
      subcategoryMap[card.subcategory.id] = {
        id: card.id,
        header: card.subcategory.title,
        category: card.category,
        subcategory: card.subcategory,
      }
    })

    subcategories = _.map(subcategoryMap, subcategory => subcategory)

    return subcategories
  }

  getCards (items) {
    const { filter } = this.props

    if (_.isEmpty(filter.filters) && _.isEmpty(filter.searchTerm) && !isModerator) {
      return this.getSubcategoryCards.call(this, items)
    } else {
      return this.getTenderCards.call(this, items)
    }
  }

  getCardComponent (tender) {
    const { filter, fetchTenders, saveToFavourites, saveToHistory, changeFilterValue } = this.props

    if (_.isEmpty(filter.filters) && _.isEmpty(filter.searchTerm)) {
      return (
        <Card
          link
          onClick={() => changeFilterValue('subcategory.title', tender.subcategory.title)}
          style={{ flex: '0 1 25%' }}
        >
          <Card.Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
            <Card.Header>{tender.subcategory.title}</Card.Header>
          </Card.Content>
        </Card>
      )
    }

    return (
      <TenderCard
        tender={tender}
        style={{ flex: '0 0 25%' }}
        saveToFavourites={saveToFavourites}
        saveToHistory={saveToHistory}
        onClose={fetchTenders}
      />
    )
  }
}
