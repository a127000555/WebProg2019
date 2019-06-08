import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { Query } from 'react-apollo'
import { USERS_QUERY } from '../../graphql/queries';
export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
        title : 'Select Users',
        dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  clickEvent(id,name) {
      return ()=>{
          this.setState({title:name});
          this.props.change(id);
      }

  }
  render() {
    return (
        
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          {this.state.title}
        </DropdownToggle>
        <DropdownMenu>
            <Query query={USERS_QUERY}>
            {({ loading, error, data, subscribeToMore }) => {
                if (loading) return <option>Loading...</option>
                if (error) return <option>Error :(((</option>
                const users = data.users.map( ({id, name, __typename}) => ( 
                <DropdownItem onClick={this.clickEvent(id,name)} key={'toggle_'+name} value={id}>{name}</DropdownItem>
                ))
                
            　return users
            }}
            </Query>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}
