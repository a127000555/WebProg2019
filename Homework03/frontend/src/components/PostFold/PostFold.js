import React from 'react';
import { Card, CardHeader, Collapse, CardBody } from 'reactstrap'

import { Query } from 'react-apollo'
import { POSTS_GIVEN_USERID_QUERY,POSTS_PER_USER_SUBSCRIPTION } from '../../graphql';

let unsubscribe = {};
export default class PostFold extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
        collapse: false
    };
  }

  toggle() {
    this.setState({
      collapse: !this.state.collapse
    });
  }
  render() {
    return (
          <Card onClick={this.toggle} style={{ margin: '30px auto', width: '400px' }}>
            <CardHeader>{this.props.name}({this.props.quantity})</CardHeader>
            <Collapse isOpen={this.state.collapse}>
              <Query query={POSTS_GIVEN_USERID_QUERY(this.props.id)}>
                {({ loading, error, data, subscribeToMore }) => {
                    if (loading) return <option>Loading...</option>
                    if (error) return <option>Error :(((</option>
                    if (!unsubscribe[this.props.id]){
                      unsubscribe[this.props.id] = subscribeToMore({
                        document: POSTS_PER_USER_SUBSCRIPTION(this.props.id),
                        updateQuery: (prev, { subscriptionData }) => {
                          if (!subscriptionData.data)return prev
                          const newPost = subscriptionData.data.postPerUser.data;
                          return {
                            ...prev,
                            users:[{ 
                              posts: [newPost, ...prev.users[0].posts],
                              __typename: 'User',
                              name: this.props.name,
                              id: this.props.id
                            }]
                          }
                        }
                      })
                    } 
                    let posts = data.users[0].posts;
                    return posts.map((post)=>(
                    <Card key={post.id}>
                      <CardHeader>{post.title}</CardHeader>
                      <CardBody>
                        {post.body}
                      </CardBody>
                    </Card>));
                }}
              </Query>
            </Collapse>
          </Card>      
    );
  }
}