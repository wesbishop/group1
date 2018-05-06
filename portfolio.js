$(function() {

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
    document.getElementById("amount").value = "";
    document.getElementById("pairs").value = "___";


    renderPortfolio();
   
  })
 
 function renderPortfolio() {
  let divSimulations = document.getElementById("simulations")
  let htmlSimulations = ""

   appUser.currencies.forEach(element => {
    htmlSimulations += `<li class="list-group-item list-group-item-action" data-id="${element.pair}">
                        ${element.pair}-${element.description}
                        </li>`
                        });
   divSimulations.innerHTML = htmlSimulations;
 }

})