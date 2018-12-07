// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : '775119562837171', // your App ID
        'clientSecret'    : 'd911c32bcd34f50a2aa5755b83e7ead6', // your App Secret
        'callbackURL'     : 'http://localhost:8080/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields'   : ['id', 'email', 'name'] // For requesting permissions from Facebook API

    },

    'twitterAuth' : {
        'consumerKey'        : 'your-consumer-key-here',
        'consumerSecret'     : 'your-client-secret-here',
        'callbackURL'        : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '546290068998-5ci61roaiiijk4055u5bbhta99bp8kqd.apps.googleusercontent.com',
        'clientSecret'     : 'Kn2YMbGWD86T8pAzKSovN2Fl',
        'callbackURL'      : 'http://localhost:8080/auth/google/callback'
    }

};
