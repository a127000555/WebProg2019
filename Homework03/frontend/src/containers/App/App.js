import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap'

import {
  POSTFOLD_QUERY,
  CREATE_POST_MUTATION,
  POSTFOLD_SUBSCRIPTION
} from '../../graphql'
import PostFold from '../../components/PostFold/PostFold'
import Userbar from '../../components/Userbar/Userbar'
import classes from './App.module.css'

let unsubscribe = null

class App extends Component {
  state = {
    formTitle: '',
    formBody: '',
    formAuthorId: 0
  }
  handleChangeId = id => {
    this.setState({formAuthorId:id})
  }
  handleFormSubmit = e => {
    e.preventDefault()

    const { formTitle, formBody, formAuthorId } = this.state

    if (!formTitle || !formBody) return
    this.createPost({
      variables: {
        title: formTitle,
        body: formBody,
        published: true,
        authorId: formAuthorId
      }
    })

    this.setState({
      formTitle: '',
      formBody: ''
    })
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1 className={classes.title}>Modern GraphQL Tutorial</h1>
          </Col>
        </Row>
        <Row>
          <Col xs="6" className={classes.form}>
            <Mutation mutation={CREATE_POST_MUTATION}>
              {createPost => {
                this.createPost = createPost

                return (
                  <Form onSubmit={this.handleFormSubmit}>
                    <FormGroup row>
                      <Label for="author" sm={5}>
                        User  
                      </Label>
                      <Userbar change={this.handleChangeId}>
                      </Userbar>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="title" sm={2}>
                        Title
                      </Label>
                      <Col sm={10}>
                        <Input
                          name="title"
                          value={this.state.formTitle}
                          id="title"
                          placeholder="Post title..."
                          onChange={e =>
                            this.setState({ formTitle: e.target.value })
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Label for="body">Body</Label>
                      <Input
                        type="textarea"
                        name="body"
                        value={this.state.formBody}
                        id="body"
                        placeholder="Post body..."
                        onChange={e =>
                          this.setState({ formBody: e.target.value })
                        }
                      />
                    </FormGroup>
                    <Button type="submit" color="primary">
                      Post!
                    </Button>
                  </Form>
                )
              }}
            </Mutation>
          </Col>
          <Col xs="6">
            <Query query={POSTFOLD_QUERY}>
              {({ loading, error, data, subscribeToMore }) => {
                if (loading) return <p>Loading...</p>
                if (error) return <p>Error :(((</p>
                
                if (!unsubscribe)
                  unsubscribe = subscribeToMore({
                    document: POSTFOLD_SUBSCRIPTION,
                    updateQuery: (prev, { subscriptionData }) => {
                      if (!subscriptionData.data) return prev
                      const newPost = subscriptionData.data.post.data

                      return {
                        ...prev,
                        posts: [newPost, ...prev.posts]
                      }
                    }
                  })

                let authors_count = {}
                data.posts.forEach((post)=>{
                  let name =  post.author.name;
                  if(!authors_count[name])
                    authors_count[name] = [0 , post.author.id];
                  authors_count[name][0] ++ ;
                })
                const postFolds = Object.keys(authors_count).map((name)=>(
                  <PostFold 
                    key={authors_count[name][1]} 
                    id={authors_count[name][1]} 
                    name={name} 
                    quantity={authors_count[name][0]}>
                  </PostFold>));
                
                
                

                return <div>{postFolds}</div>
              }}
            </Query>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App
