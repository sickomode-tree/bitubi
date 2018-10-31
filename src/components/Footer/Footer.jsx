import React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import './FloatingButton.scss'

const Footer = () => (
  <Modal
    size={'tiny'}
    trigger={<Button className={'FloatingButton'} icon={'info'} size={'huge'} circular />}
  >
    <Modal.Header>О нас</Modal.Header>
    <Modal.Content>
      <p>
        BITUBI - это электронный каталог поставщиков по Санкт-Петербургу и ЛО, с помощью которого закупщики выбирают
        лучшие предложения поставщиков, а поставщики находят новых клиентов и увеличивают продажи
      </p>
      <Header>Реквизиты</Header>
      <p>
        ООО "БИТУБИ", ИНН 7839106480, КПП 783901001, 190121, Санкт-Петербург г, Реки Пряжки наб, дом № 3/1,
        литера А, квартира Пом/Ком 3-Н/332
      </p>
    </Modal.Content>
  </Modal>
)

export default Footer
