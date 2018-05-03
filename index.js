$(function() {


  
  // var x = 1;
  appUser = new User();

    
  function renderUserLoggedIn(value) {
    if (value) {
      console.log("user logged in", firebaseUser);
      menuItemLogout.classList.remove("d-none");
      menuItemLogin.classList.add("d-none");
      userInitial.classList.remove("d-none");
      userInitial.innerHTML = appUser.email.toString().substring(0,1) ;
    } else
     {
      console.log("NOT logged in");
      menuItemLogout.classList.add("d-none");
      menuItemLogin.classList.remove("d-none");
      userInitial.classList.add("d-none");
      userInitial.innerHTML = "";
    }
  }

  let b = 2;

  firebase.initializeApp(appUser.config);
  const menuItemLogin = document.getElementById("menuItemLogin");
  const menuItemFeatures = document.getElementById("menuItemFeatures");
  const menuItemLogout = document.getElementById("menuItemLogout");
  const txtEmail = document.getElementById("txtEmail");
  const txtPassword = document.getElementById("txtPassword");
  const btnLogin = document.getElementById("btnLogin");
  const userInitial = document.getElementById("userInitial");
  const btnSignUp = document.getElementById("btnSignUp");
  const divLoginModal = document.getElementById("loginModal");
  const loginMessage = document.getElementById("loginMessage");

  //Event listeners
  menuItemAppUser.addEventListener("click", e=> {
    console.log("user email:", appUser.email);
  })

  menuItemLogout.addEventListener("click", e=> {
      firebase.auth().signOut();
  })

    
  btnLogin.addEventListener("click", e=> {
      const email = txtEmail.value;
      const password = txtPassword.value;

      appUser.login(email,password)
      .then(value => {
        console.log(value);
        $(divLoginModal).modal("toggle");
        //how to toggle with vanilla JS ?
      })
      .catch(e=>  {
        loginMessage.innerHTML = e.message;
      });
  })  //btnLogin.addEventListener

  btnSignUp.addEventListener("click",e => {
      const email = txtEmail.value;
      const password = txtPassword.value;
     
      appUser.signUp(email,password)
      .catch(e=> {
        loginMessage.innerHTML = e.message; 
      });

  })

  //add a realtime listener
  firebaseUser = firebase.auth().currentUser;

  firebase.auth().onAuthStateChanged(firebaseUser => {
  console.log("state changed");
  if (firebaseUser) {
    appUser.init(firebaseUser);
    renderUserLoggedIn(true);
    } else {
        renderUserLoggedIn(false);
     }
  });

});