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
    // console.log("renderUserLoggedIn",value);
    // console.log(appUser);
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
      alert("You must provide a 'pair' and an 'amount'")
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
      console.log("pair",pair,description,amount);
      appUser.addPair(pair,description,new Date(),amount);
    }

    //clear input area
    document.getElementById("amount").value = "";
    document.getElementById("pairs").value = "___";

    renderPortfolio();
   
  })
 
 function renderPortfolio() {
  let divSimulations = document.getElementById("simulations")
  let htmlSimulations = ""

  //ADAM help tuesday
  console.log(appUser.currencies.length,typeof appUser.currencies, appUser.currencies)


  appUser.currencies.forEach(element => {
    console.log("pair",element.pair)
    htmlSimulations += `<li class="list-group-item list-group-item-action" data-id="${element.pair}">
                        ${element.pair}-${element.description}
                        </li>`
                        });

  // console.log(appUser);
  console.log("htmlSimulations",htmlSimulations);                        
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