$(function() {

  appUser = new User();

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


  menuItemLogout.addEventListener("click", e=> {
      firebase.auth().signOut();
      window.location.replace("./index.html");
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
      appUser.logout();
    }
    // renderPortfolio()
  }

  // menuItemLoadData.addEventListener("click", e=> {
  //   appUser.loadData();
  // })

  // menuItemSaveData.addEventListener("click", e=> {
  //   appUser.storeData();
  // })

  // menuItemAppUserData.addEventListener("click", e=> {
  //   appUser.consoleLogData();
  // })

  // menuItemFirebaseData.addEventListener("click", e=> {
  //   appUser.consoleLogFirebaseData();
  // })


  addPair.addEventListener("click", e => {
    let pair = document.getElementById("pairs").value;
    let pairDescription = document.getElementById("pairs");

    let description = pairDescription.options[pairDescription.selectedIndex].text;
    let amount = document.getElementById("amount").value;
    let isInSimulator = false;


    //Input validation
    if (pair == "___" || amount == "" || isNaN(amount)) {
      alert("You must provide a 'pair' and 'amount'")
      renderPortfolio();
      return;
    }

    appUser.currencies.forEach(element => {
      if (element.pair == pair ) {
        isInSimulator = true;
        alert("This pair is currently in your portfolio");
      }
    });
    if (!isInSimulator) {
      appUser.addPair(pair,description,new Date(),amount);
    }

    //clear input area
    document.getElementById("amount").value = "";
    document.getElementById("pairs").value = "___";

    renderPortfolio();

  })

  simulations.addEventListener("click", e=> {
    let pair = "";
    if (e.target.hasAttribute("data-id")) {
      pair = e.target.dataset["id"];

    }
    if (pair == "") return;


    if (e.target.classList.contains("delete-pair")) {
      appUser.deletePair(pair);
      renderPortfolio();
    } else {
      //Display chart
      let curTime = Number($('#makePair').attr('time'));
      let curRepeat = Number($('#makePair').attr('repeat'));
      $('#makePair').remove();
      $('body').append(`<a id='makePair' value =${pair} time=${curTime} repeat=${curRepeat}>`);
      let curPair = $('#makePair').attr('value');
       $('#myChart').remove();
       $('iframe').remove();
      $('#chart').append('<canvas id="myChart" class="d-inline"></canvas>');
      var newUrl = new drawChart(pair,curTime, curRepeat);
      newUrl.colorPick();
      newUrl.objectMaker();
      // alert("display chart");
    }

  });


 function renderPortfolio() {
  let divSimulations = document.getElementById("simulations")
  let htmlSimulations = ""
  let htmlListItem = ""

  //ADAM#1 help tuesday
  console.log("appCurrencies",appUser.currencies.length,typeof appUser.currencies, appUser.currencies)


  appUser.currencies.forEach(element => {
    let amount = parseInt(element.amount).toLocaleString();
    htmlListItem =  `<li class="list-group-item bg-dark text-light list-group-item-action px-0" data-id="${element.pair}">
                       <div class="d-flex justify-content-start" data-id="${element.pair}">
                         <div data-id="${element.pair}" class="col-6">${element.pair}-${element.description}</div>
                         <div data-id="${element.pair}" class="text-right col-3">${amount}</div>
                         <div class="col-3 text-center justify-content-end">
                           <button type='button' data-id="${element.pair}" class=' btn btn-danger delete-pair'>X
                           </button>
                         </div>
                        </div>
                      </li>`
    htmlSimulations += htmlListItem ;
    });

  divSimulations.innerHTML = htmlSimulations;

}

 firebase.initializeApp(appUser.firebaseConfig);

  //add a realtime listener
  firebaseUser = firebase.auth().currentUser;

  firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log("Logged in");
    var init = async function() { // async function expression assigned to a variable
      await appUser.init(firebaseUser);
      console.log("finished init");
      console.log(appUser.currencies);
      renderPortfolio();
      return ;
    }();

    // appUser.init(firebaseUser);

    renderUserLoggedIn(true);
    // renderPortfolio();
  } else {
        renderUserLoggedIn(false);
        renderPortfolio();
      }
  });

});
