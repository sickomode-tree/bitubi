import React from 'react'
import {
  Card,
  Grid,
  Header,
  Icon,
  Image,
  Segment,
} from 'semantic-ui-react'

export const Profile = () => (
  <Grid>
    <Grid.Row>
      <Grid.Column width={6}>
        <Card>
          <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
          <Card.Content>
            <Card.Header></Card.Header>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='like' />
            </a>
          </Card.Content>
        </Card>
      </Grid.Column>
      <Grid.Column width={10}>
        <Segment>
          <Header as='h1'>Константин Житков</Header>
        </Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

export default Profile
