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
    //console.log("user email:", appUser.email);
    appUser.loadData();
  })

  menuItemSaveData.addEventListener("click", e=> {
    //console.log("user email:", appUser.email);
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

simulations.addEventListener("click", e=> {
  let pair = e.target.dataset["id"];
  $('#makePair').remove();
  $('body').append(`<a id='makePair' value =${pair}>`);
  var curPair = $('#makePair').attr('value');
   $('#myChart').remove();
   $('iframe').remove();
  $('#chart').append('<canvas id="myChart" class="d-inline"></canvas>');
  var newUrl = new drawChart(pair,86400);
  newUrl.objectMaker();
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

})

