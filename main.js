$(function() {

  appUser = new User();
    
  function renderUserLoggedIn(value) {
    if (value) {
      menuItemLogout.classList.remove("d-none");
      menuItemLogin.classList.add("d-none");
      userInitial.classList.remove("d-none");
      userInitial.innerHTML = appUser.email.toString().substring(0,1) ;
    } else
     {
      menuItemLogout.classList.add("d-none");
      menuItemLogin.classList.remove("d-none");
      userInitial.classList.add("d-none");
      userInitial.innerHTML = "";
    }
  }

  firebase.initializeApp(appUser.firebaseConfig);

  //add a realtime listener
  firebaseUser = firebase.auth().currentUser;

  firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    appUser.init(firebaseUser);
    renderUserLoggedIn(true);
    } else {
        renderUserLoggedIn(false);
     }
  });


});