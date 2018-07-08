import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Segment,
  Table,
} from 'semantic-ui-react'

export default class Profile extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    fetchUser: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    const { user } = this.props

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Card fluid>
              <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
              <Card.Content>
                <Card.Header></Card.Header>
              </Card.Content>
              <Card.Content extra>
                {
                  user.verified
                  ? <div><Icon name='check circle' size='large' color='green' /> Подтвержден</div>
                  : <div><Icon name='question circle' size='large' color='yellow' /> На рассмотрении</div>
                }
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column width={12}>
            <Segment>
              <Header as='h1'>{ user.username }</Header>
            </Segment>
            <Table>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Логин</Table.Cell>
                  <Table.Cell>
                    {user.login}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Email</Table.Cell>
                  <Table.Cell>
                    {user.email}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Контакты</Table.Cell>
                  <Table.Cell>
                    {user.contactInfo}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
