export const initUser = token => {
  fetch(
    'https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' +
      token,
  )
    .then(response => response.json())
    .then(json => {
      // Some user object has been set up somewhere, build that user here
      console.log(json);
    })
    .catch(() => {
      console.log('ERROR GETTING DATA FROM FACEBOOK');
    });
};
