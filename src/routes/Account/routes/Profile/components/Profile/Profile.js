import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Card,
  Container,
  Dimmer,
  Grid,
  Header,
  Icon,
  Image,
  Message,
  Modal,
  Reveal,
  Segment,
  Table
} from 'semantic-ui-react'
import {customerUserType, providerUserType} from 'utils/auth'
import {getObjectValue} from 'utils/array'
import ProfileEditModal from './components/ProfileEditModal/ProfileEditModal'

export default class Profile extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    cities: PropTypes.array.isRequired,
    fetchUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    updateUserpic: PropTypes.func.isRequired,
    fetchCities: PropTypes.func.isRequired,
    resetFilter: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.resetFilter()
    this.props.fetchUser()
  }

  render() {
    const {user, cities, fetchCities, fetchUser, updateUser, updateUserpic} = this.props
    const userInfo = [
      {code: 'login', title: 'Логин'},
      {code: 'city.name', title: 'Город'},
      {code: 'district.name', title: 'Район'},
      {code: 'address', title: 'Адрес'},
      {code: 'email', title: 'Email'},
      {code: 'phoneNumber', title: 'Телефон'},
      {code: 'url', title: 'Сайт'},
    ]
    let title

    switch (user.userType) {
      case providerUserType:
        title = user.providerName
        break
      case customerUserType:
        title = `${user.firstName} ${user.lastName}`
        break
      default:
        title = ''
    }

    return (
      <Container>
        <Segment.Group horizontal>
          <Segment style={{flex: 1}}>
            <Segment vertical style={{border: 0}}>
              <Image
                circular
                src={user.photo && '/test/images/' + user.photo.original}
              />
            </Segment>
            <Message warning={!user.verified} success={user.verified}>
              {
                user.verified
                  ? <div><Icon name='check circle' size='large' color='green'/> Подтвержден</div>
                  : <div><Icon name='question circle' size='large' color='yellow'/> На рассмотрении</div>
              }
            </Message>
            <Segment vertical>
              <ProfileEditModal
                user={user}
                cities={cities}
                updateUserpic={updateUserpic}
                fetchCities={fetchCities}
                onClose={fetchUser}
                onSubmit={updateUser}
                trigger={
                  <Card.Content extra as='a'>
                    <Button content='Редактировать' icon='cog' labelPosition='left' fluid circular positive/>
                  </Card.Content>
                }
              />
            </Segment>
          </Segment>
          <Segment>
            <Header as='h1'>{title}</Header>
            <Table basic='very' celled>
              <Table.Body>
                {
                  userInfo.map(info => (
                    !_.isEmpty(user) &&
                    <Table.Row key={info.code}>
                      <Table.Cell>{info.title}</Table.Cell>
                      <Table.Cell>
                        {getObjectValue(user, info.code)}
                      </Table.Cell>
                    </Table.Row>
                  ))
                }
              </Table.Body>
            </Table>
          </Segment>
        </Segment.Group>
      </Container>
    )
  }
}
