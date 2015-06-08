define(function (require) {
  "use strict";

  var globals = require('globals'),
      stores = require('stores'),
      Utils = require('../Utils');

  return {

    requestImage: function(params){
      if(!params.instance) throw new Error("Missing instance");
      if(!params.name) throw new Error("Missing name");
      if(!params.description) throw new Error("Missing description");
      if(!params.tags) throw new Error("Missing tags");
      if(!params.providerId) throw new Error("Missing providerId");
      //if(!params.software) throw new Error("Missing software");
      //if(!params.filesToExclude) throw new Error("Missing filesToExclude");
      //if(!params.systemFiles) throw new Error("Missing systemFiles");
      if(!params.visibility) throw new Error("Missing visibility");
      if(!params.imageUsers) throw new Error("Missing imageUsers");


      var instance = params.instance,
          name = params.name,
          description = params.description,
          providerId = params.providerId,
          software = params.software,
          filesToExclude = params.filesToExclude,
          systemFiles = params.systemFiles || "[no files specified]",
          visibility = params.visibility,
          imageUsers = params.imageUsers,
          userNames = imageUsers.map(function(user){
            return user.get('username');
          }),
          tags = params.tags,
          tagNames = tags.map(function(tag){
            return tag.get('name');
          }),
          provider = stores.ProviderStore.get(providerId);

      var requestData = {
        instance: instance.get('uuid'),
        ip_address: instance.get("ip_address"),
        name: name,
        description: description,
        tags: tagNames,
        provider: provider.get('uuid'),
        vis: visibility,
        shared_with: userNames,
        exclude: filesToExclude || "[no files specified]",
        software: software || "[no software specified]",
        sys: systemFiles || "[no files specified]"
      };

      var requestUrl = (
        globals.API_ROOT +
        "/provider/" + instance.get('provider').uuid +
        "/identity/" + instance.get('identity').uuid +
        "/request_image"
      );

      $.ajax({
        url: requestUrl,
        type: 'POST',
        data: JSON.stringify(requestData),
        dataType: 'json',
        contentType: 'application/json',
        success: function (model) {
          Utils.displaySuccess({message: "Your image request has been sent to support."});
        },
        error: function (response, status, error) {
          Utils.displayError({title: "Your image request could not be sent", response: response});
        }
      });
    }

  };

});