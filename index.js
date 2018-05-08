$(function() {
  appUser = new User();
    
  const txtEmail = document.getElementById("txtEmail");
  const txtPassword = document.getElementById("txtPassword");
  const loginMessage = document.getElementById("loginMessage");
  
  const txtSignUpEmail = document.getElementById("txtSignUpEmail");
  const txtSignUpPassword = document.getElementById("txtSignUpPassword");
  const signUpMessage = document.getElementById("signUpMessage");

  btnLogin.addEventListener("click", e=> {
    const email = txtEmail.value;
    const password = txtPassword.value;
  
    appUser.login(email,password)
    .then(value => {
      const divLoginModal = document.getElementById("loginModal");
      $(divLoginModal).modal("toggle");
    })
    .catch(e=>  {
      loginMessage.innerHTML = e.message;
    });
  })  //btnLogin.addEventListener


  btnSignUp.addEventListener("click",e => {
  
    const email = txtSignUpEmail.value;
    const password = txtSignUpPassword.value;
    appUser.signUp(email,password)
    .catch(e=> {
      signUpMessage.innerHTML = e.message; 
    });
  })


 firebase.initializeApp(appUser.firebaseConfig);

  //add a realtime listener
  firebaseUser = firebase.auth().currentUser;

  firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    var init = async function() { // async function expression assigned to a variable
      await appUser.init(firebaseUser);
      window.location.replace("./main.html");
      return ;
    }();
  } else {
      //stay on this page
      }
  });


});