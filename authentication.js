$(function() {

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
  const simulations = document.getElementById("simulations");


  menuItemLoadData.addEventListener("click", e=> {
    appUser.loadData();
  })

  menuItemSaveData.addEventListener("click", e=> {
    appUser.storeData();
  })

  menuItemAppUserData.addEventListener("click", e=> {
    appUser.consoleLogData();
  })

  menuItemFirebaseData.addEventListener("click", e=> {
    appUser.consoleLogFirebaseData();
  })


  menuItemLogout.addEventListener("click", e=> {
      firebase.auth().signOut();
  })


  btnLogin.addEventListener("click", e=> {
    const email = txtEmail.value;
    const password = txtPassword.value;

    appUser.login(email,password)
    .then(value => {
      $(divLoginModal).modal("toggle");
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

})    



