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
      appUser.logout();
    }
    renderPortfolio()
  }


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
      alert("display chart");
    }

  });


 function renderPortfolio() {
  let divSimulations = document.getElementById("simulations")
  let htmlSimulations = ""
  let htmlListItem = ""

  //ADAM#1 help tuesday
  console.log(appUser.currencies.length,typeof appUser.currencies, appUser.currencies)


  appUser.currencies.forEach(element => {

    htmlListItem =  `<li class="list-group-item list-group-item-action" data-id="${element.pair}">
                       <div class="d-flex justify-content-between" data-id="${element.pair}">
                         <div data-id="${element.pair}">${element.pair}-${element.description}</div>
                         <div>
                           <button type='button' data-id="${element.pair}" class='btn btn-default delete-pair'>X
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
    appUser.init(firebaseUser);
    renderUserLoggedIn(true);
    renderPortfolio();
  } else {
        renderUserLoggedIn(false);
     }
    renderPortfolio();
  });

});