define(function (require) {

  var React = require('react'),
      Backbone = require('backbone'),
      UserMultiSelect = require('./UserMultiSelect.react');

  var ENTER_KEY = 13;

  return React.createClass({
    display: "EditMembershipView",

    propTypes: {
      activeUsers: React.PropTypes.instanceOf(Backbone.Collection).isRequired,
      users: React.PropTypes.instanceOf(Backbone.Collection).isRequired,
      onUserAdded: React.PropTypes.func.isRequired,
      onUserRemoved: React.PropTypes.func.isRequired,
      onCreateNewUser: React.PropTypes.func,
      label: React.PropTypes.string.isRequired
    },

    getInitialState: function(){
      return {
        isEditingUsers: false,
        query: ""
      }
    },


    onEnterKeyPressed: function(e){
      var text = e.target.value;
      if (e.which === ENTER_KEY && text.trim()) {
        this.props.onCreateNewUser(text);
      }
    },


    onQueryChange: function(query){
      this.setState({query: query});
    },

    render: function () {
      var query = this.state.query,
          link,
          newUserButton,
          userView,
          users = this.props.users;

      if(query){
        users = this.props.users.filter(function(user){
          return user.get('username').toLowerCase().indexOf(query) >= 0;
        });
        users = new Backbone.Collection(users);
      }

        var updateLink = (
          <a className="toggle-editing-link" href="#" onClick={this.onDoneEditingUsers}>Save Changes</a>
        );

        var newUserButton = (
          <a className="btn btn-primary new-user" href="#" >+ New user</a>
        );

        var userView = (
          <UserMultiSelect
            models={users}
            activeModels={this.props.activeUsers}
            onModelAdded={this.props.onUserAdded}
            onModelRemoved={this.props.onUserRemoved}
            onEnterKeyPressed={this.onEnterKeyPressed}
            onQueryChange={this.onQueryChange}
            placeholderText="Search by user name..."
          />
        );

      return (
        <div className="resource-users">
          <span className='user-title'>{this.props.label}</span>
          {updateLink}
          {userView}
        </div>
      );
    }

  });

});
