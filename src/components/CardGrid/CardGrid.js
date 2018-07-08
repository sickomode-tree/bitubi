import React, {Component} from "react";
import PropTypes from "prop-types";
import _ from 'lodash'
import { Button, Grid, Icon, Segment } from 'semantic-ui-react'
import CardGridGroup from './components/CardGridGroup/CardGridGroup'

export default class CardGrid extends Component {
  static propTypes = {
    cards: PropTypes.array.isRequired,
    groupKey: PropTypes.string.isRequired,
  }

  state = {
    groups: this.getGroups.call(this, this.props.cards, this.props.groupKey)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      groups: this.getGroups.call(this, nextProps.cards, nextProps.groupKey),
    });
  }

  render() {
    return (
      <section className='d-flex'>
        <Button onClick={this.showPreviousCardGroup.bind(this)} style={{position: 'fixed', top: '50%', left: 20}} icon='angle left'/>
        <Button onClick={this.showNextCardGroup.bind(this)} style={{position: 'fixed', top: '50%', right: 20}} icon='angle right'/>

        <Grid columns={3} style={{overflow: 'hidden'}}>
          <Grid.Row>
            {
              this.state.groups.map(group => (
                <Grid.Column key={group.title} className='d-flex h-100' style={{overflow: 'hidden', flexDirection: 'column'}}>
                  <Segment
                    basic
                    textAlign='center'
                    className='p-2'
                    style={{
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      cursor: 'default',
                    }}
                  >
                    {group.title}
                  </Segment>
                  <CardGridGroup title={group.title} cards={group.cards}/>
                </Grid.Column>
              ))
            }
          </Grid.Row>
        </Grid>
      </section>
    )
  }

  getGroups(cards, groupKey) {
    let groups = []
    let groupsObj = {}
    let _tmpObj = {}
    let groupTitle = ''

    cards.map(card => {
      // get value from nested path {a: {b: 1}}
      _tmpObj = card
      groupKey.split('.').forEach(key => {
        _tmpObj = _tmpObj[key]
      })

      groupTitle = _tmpObj

      if (!_.isNil(groupTitle)) {
        if (_.isNil(groupsObj[groupTitle])) groupsObj[groupTitle] = {title: groupTitle, cards: []}
        groupsObj[groupTitle].cards.push(card)
      }
    })

    _.mapKeys(groupsObj, value => groups.push(value))

    return groups
  }

  showPreviousCardGroup() {
    const { groups } = this.state;

    groups.unshift(groups.pop());

    this.setState({
      groups,
    });
  }

  showNextCardGroup() {
    const { groups } = this.state;

    groups.push(groups.shift());

    this.setState({
      groups,
    });
  }
}
