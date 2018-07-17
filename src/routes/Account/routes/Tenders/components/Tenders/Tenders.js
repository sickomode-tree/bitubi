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
    fetchTenders: PropTypes.func.isRequired,
    saveTender: PropTypes.func.isRequired,
    resetFilter: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchTenders()
    this.props.resetFilter()
  }

  render() {
    const {items, saveTender} = this.props
    const userType = getUserType()

    if (!_.isEmpty(items)) {
      return (
        <div style={{flex: 1}}>
          <h2>Тендеры</h2>
          <Card.Group itemsPerRow={2}>
            {
              userType === customerUserType &&
              <TenderFormModal
                saveTender={saveTender}
                trigger={
                  <Card
                    fluid
                    link
                    header='Создать тендер'
                    style={{flex: '0 1 25%'}}
                  />
                }
              />
            }
            {
              items.map(card => (
                <Card
                  fluid
                  key={card.id}
                  header={card.category.title}
                  meta={card.city}
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
