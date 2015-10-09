Meteor.methods({
    "addPosts": function(obj) {
        check(this.userId, String);  // check user id
        Posts.insert({
            author: {
                _id: this.userId,  // get the id
                name: Meteor.user().username,
                profile_image: Gravatar.imageUrl(Meteor.user().emails[0].address, {d: "retro"})
            },
            pageId: obj.pageId,    // pub&sub
            message: obj.message,
            createdAt: new Date()  //반드시 서버시간! no 클라이언트시간
        });
    }
});
