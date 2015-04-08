
(function() {

var appId = process.env.REMINISCE_FACEBOOK_APPID;
var secret = process.env.REMINISCE_FACEBOOK_SECRET;

if (appId == null || secret == null) {
  throw new Meteor.Error(500, 'Cannot get Facebook app ID and secret from environment');
}

ServiceConfiguration.configurations.upsert(
  { service: 'facebook' },
  {
    $set: {
      loginStyle: 'popup',
      appId: appId,
      secret: secret,
      scope: ['public_profile', 'user_friends', 'email', 'user_likes', 'user_photos', 'user_posts', 'user_status', 'user_tagged_places']
    }
  }
);

ServiceConfiguration.configurations.upsert(
  { service: 'gmaps' },
  {
    $set: {
      zoom: 9,
      apiKey: "AIzaSyBGVhKl-Aqh5hSTCaCPLIY93dUSqWG1XhE",
      sensor: false,
      marker: {
        initialPosition: {
          latitude: 46.5285085,
          longitude: 6.5601122
        }
      }
    }
  }
);

})();
