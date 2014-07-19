/** @jsx React.DOM */

define(
  [
    'react',
    'backbone',
    'context',
    './Tags.react'
  ],
  function (React, Backbone, context, Tags) {

    return React.createClass({

      propTypes: {
        application: React.PropTypes.instanceOf(Backbone.Model).isRequired
      },

      onSuggestTag: function(e){
        e.preventDefault();
        // todo: I have NO IDEA how this is getting triggered when clicking on an application and
        // navigating to the detail page.  Figure it out and remove the isMounted check.
        if(e.target.tagName === "A") alert("Tag suggestion featured not implemented yet.");
      },

      render: function () {

        var suggestTag;
        if(context.profile){
          suggestTag = (
            <a href='#' onClick={this.onSuggestTag}>Suggest a Tag</a>
          );
        }

        return (
          <div className="image-tags">
            <h2 className='tag-title'>Image Tags</h2>
            {suggestTag}
            <Tags tags={this.props.application.get('tags')}/>
          </div>
        );
      }

    });

  });