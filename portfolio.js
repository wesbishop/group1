$(function() {

  addPair.addEventListener("click", e => {
    let pair = document.getElementById("pairs").value;
    let amount = document.getElementById("amount").value;

    appUser.currencies.forEach(element => {
      if (element.pair == pair ) {
        alert("This pair is currently in your portfolio");
        // break;
        // console.log("have this one");
      } else {
        appUser.addPair(pair,amount);
      }
    });
    renderPortfolio();
   
  })
 
 function renderPortfolio() {
   document.getElementById("portfolio").innerHTML = "";

   appUser.currencies.forEach(element => {
    let portfolioCard = `<div data-id=${element}>
                         </div>`
   });

 }

})