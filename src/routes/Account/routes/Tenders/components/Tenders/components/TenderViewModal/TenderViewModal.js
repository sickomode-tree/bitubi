import React, {Component} from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {Button, Modal} from 'semantic-ui-react'
import IconList from 'components/IconList/IconList'
import Tag from 'components/Tag/Tag'
import TenderEditModal from '../TenderEditModal/TenderEditModal'

class TenderViewModal extends Component {
  static propTypes = {
    trigger: PropTypes.node,
    tender: PropTypes.object.isRequired,
    disableTender: PropTypes.func.isRequired,
  }

  render() {
    const {
      tender, trigger, cities, categories, subcategories, items,
      fetchTenders, fetchCities, fetchCategories, fetchSubcategories,
      saveTender, disableTender,
    } = this.props

    return (
      <Modal
        trigger={trigger || <Button basic>Открыть тендер</Button>}
        dimmer='blurring'
        size='large'
      >
        <Modal.Header>{tender.title}</Modal.Header>
        <Modal.Content image>
          <Modal.Description style={{width: '100%'}}>
            <Tag icon='tags' content={tender.category.title}/>
            <Tag icon='tag' content={tender.subcategory.title}/>

            <br/>

            <IconList
              data={[
                {icon: 'building', header: 'Город', description: tender.city.name},
                {icon: 'map marker alternate', header: 'Район', description: tender.district.name},
                {icon: 'calendar', header: 'Дата создания', description: moment(tender.expectedDate).format('DD.MM.YYYY')},
                {icon: 'box', header: 'Количество, шт', description: +tender.amount},
                {icon: 'ruble', header: 'Стоимость, руб', description: +tender.price},
                {icon: 'comment', header: 'Комментарий', description: tender.comment},
              ]}
            />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

export default TenderViewModal
