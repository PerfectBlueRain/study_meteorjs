Template.main.helpers({
  'page': function() {
      return Session.get('pageId') || 'popular';
  }
});

Template.main.events({
    "submit": function(event, template) {
        Meteor.call("addPosts", {
            //name: "Slave4U",
            //profile_image: "http://lorempixel.com/64/64/people/",
            pageId: Session.get('pageId'),  // pub&sub
            message : template.find('#post').value  //폼에있는 메세지를 가져옴
        }, function(err) {
            if (err) {
                throw(error);
            } else {
                template.find('#post').value = "";
            }
        });
        event.preventDefault();
    }
});
