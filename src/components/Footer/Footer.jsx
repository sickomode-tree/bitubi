import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import './FloatingButton.scss'
import Image11 from './images/news-1-1.png'
import Image12 from './images/news-1-2.png'

const Footer = () => (
  <div>
    <Modal
      size={'tiny'}
      dimmer={'blurring'}
      closeIcon
      mountNode={document.getElementById('root')}
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
        <Header>Контакты</Header>
        <p>
          <a href='mailto:info@bitubi.ru' title='info@bitubi.ru'>info@bitubi.ru</a>
        </p>
        <p>
          <a href='tel:+7 (911) 111-12-77' title='+7 (911) 111-12-77'>+7 (911) 111-12-77</a>
        </p>
      </Modal.Content>
    </Modal>

    <Modal
      size={'tiny'}
      dimmer={'blurring'}
      closeIcon
      mountNode={document.getElementById('root')}
      trigger={<Button className={'FloatingButton'} icon={'newspaper'} size={'huge'} circular />}
    >
      <Modal.Header>Новости</Modal.Header>
      <Modal.Content>
        <Image src={Image11} />
        <br />
        <p>
          Команда «БиТуБи» приняла участие в выставке «Малый и средний бизнес Санкт-Петербурга» в рамках XVI Форума
          малого и среднего предпринимательства, 5-6 декабря в «Ленэкспо».
        </p>
        <p>
          Мы дали протестировать наш продукт огромному количеству предпринимателей из всех сегментов бизнеса.
          Пообщались с представителями нашей целевой аудитории и собрали колоссальный объем обратной связи о нашем
          детище!
        </p>
        <p>
          Выставка получилась очень насыщенной, мы отработали на все 200%, используя все возможности, которые
          предоставляют подобные мероприятия. Это был наш первый выход в свет, но далеко не последний!
        </p>
        <Image src={Image12} />
      </Modal.Content>
    </Modal>
  </div>
)

export default Footer
