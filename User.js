class User {
  constructor() {
    this.displayName = "";
    this.email = "";
    this.isLoggedIn = false;
    this.firebaseConfig =  {
      apiKey: "AIzaSyCD6vBIGCeiq5D3w15RYejADy9TvjqEAd8",
      authDomain: "litaf-dc21b.firebaseapp.com",
      databaseURL: "https://litaf-dc21b.firebaseio.com",
      projectId: "litaf-dc21b",
      storageBucket: "litaf-dc21b.appspot.com",
      messagingSenderId: "578563414046",
      timestampsInSnapshots: true
    };

    this.firestoreConfig =  {
      timestampsInSnapshots: true
    };
  
    this.currencies = [];
    //this.currencies = [{pair: "BTC", description: "Bitcoin", purchased:1405699200,amount: 1000.00}];
  
    // this.currencies = [{symbol: "BC1", investment: 1000.00, valuation: 1500.00}, 
    //                    {symbol: "BC2", investment: 2000.00, valuation: 2500.00},
    //                    {symbol: "BC3", investment: 3000.00, valuation: 1000.00}]
  
    // this.currencies = [{pair : "USDT_BTC", 
    //                     activity: [{"date":1405699200,"high":0.0045388,"low":0.00403001,"open":0.00404545,"close":0.00435873,"volume":44.34555992,"quoteVolume":10311.88079097},{"date":1405713600,"high":0.00435,"low":0.00412,"open":0.00428012,"close":0.00412,"volume":19.12271662,"quoteVolume":4531.85801066,"weightedAverage":0.00421961},{"date":1405728000,"high":0.00435161,"low":0.00406,"open":0.00411473,"close":0.00435161,"volume":35.18169499,"quoteVolume":8430.50936646,"weightedAverage":0.00417313}]
    //                     },
    //                     {pair : "USDT_ABC", 
    //                     activity: [{"date":1405699200,"high":0.0045388,"low":0.00403001,"open":0.00404545,"close":0.00435873,"volume":44.34555992,"quoteVolume":10311.88079097},{"date":1405713600,"high":0.00435,"low":0.00412,"open":0.00428012,"close":0.00412,"volume":19.12271662,"quoteVolume":4531.85801066,"weightedAverage":0.00421961},{"date":1405728000,"high":0.00435161,"low":0.00406,"open":0.00411473,"close":0.00435161,"volume":35.18169499,"quoteVolume":8430.50936646,"weightedAverage":0.00417313}]
    //                     }
    //                   ]

    // this.currencies = [{"date":1405699200,"high":0.0045388,"low":0.00403001,"open":0.00404545,"close":0.00435873,"volume":44.34555992,"quoteVolume":10311.88079097,"weightedAverage":0.00430043},{"date":1405713600,"high":0.00435,"low":0.00412,"open":0.00428012,"close":0.00412,"volume":19.12271662,"quoteVolume":4531.85801066,"weightedAverage":0.00421961},{"date":1405728000,"high":0.00435161,"low":0.00406,"open":0.00411473,"close":0.00435161,"volume":35.18169499,"quoteVolume":8430.50936646,"weightedAverage":0.00417313},{"date":1405742400,"high":0.00459,"low":0.0043418,"open":0.00435173,"close":0.00437,"volume":21.66886127,"quoteVolume":4839.66822966,"weightedAverage":0.00447734},{"date":1405756800,"high":0.00481,"low":0.004353,"open":0.004395,"close":0.0048,"volume":27.82215185,"quoteVolume":6030.09964751,"weightedAverage":0.00461387},{"date":1405771200,"high":0.005,"low":0.00449999,"open":0.00480001,"close":0.00456151,"volume":42.07775011,"quoteVolume":8939.84242503,"weightedAverage":0.00470676},{"date":1405785600,"high":0.00480258,"low":0.0044996,"open":0.00456152,"close":0.00456,"volume":31.62572444,"quoteVolume":6899.23074697,"weightedAverage":0.00458394},{"date":1405800000,"high":0.00486,"low":0.00440658,"open":0.00456,"close":0.00461299,"volume":25.39349312,"quoteVolume":5440.08231107,"weightedAverage":0.00466785},{"date":1405814400,"high":0.00473999,"low":0.00441991,"open":0.00462,"close":0.00441991,"volume":13.38329573,"quoteVolume":2962.41191331,"weightedAverage":0.0045177},{"date":1405828800,"high":0.00448074,"low":0.00426001,"open":0.0044199,"close":0.00435,"volume":17.12789699,"quoteVolume":3927.53152442,"weightedAverage":0.00436098},{"date":1405843200,"high":0.00455254,"low":0.00419,"open":0.00434999,"close":0.00435539,"volume":23.39336702,"quoteVolume":5429.98784936,"weightedAverage":0.00430818},{"date":1405857600,"high":0.00454822,"low":0.00415825,"open":0.00438736,"close":0.00416553,"volume":27.66542043,"quoteVolume":6397.37082615,"weightedAverage":0.00432449}]

}  //constructor
  
 
  init(firebaseUser) {
    this.email = firebaseUser.email;
    // this.currencies = [{pair: "BTC", description: "Bitcoin", purchased:1405699200,amount: 1000.00}];
    this.currencies = [];
    this.loadData();
  }

  login(email, password) {
    const auth = firebase.auth();
    return auth.signInWithEmailAndPassword(email,password);
  }

  logout() {
    this.email = "";
    // this.currencies = [{pair: "BTC", description: "Bitcoin", purchased:1405699200,amount: 1000.00}];
    this.currencies = [];
    this.loadData();

  }

  signUp(email,password) {
    const auth = firebase.auth();
    return auth.createUserWithEmailAndPassword(email,password);
  }

  addPair(pair,description,purchased,amount) {
    let newPair = {"pair": pair, "description": description,"purchased":purchased, "amount": amount}
    this.currencies.push(newPair);
    this.storeData();  
  }

  deletePair(pair) {
    let idx = this.currencies.findIndex(element => {
      return element.pair == pair;
    })
    this.currencies.splice(idx,1);
    this.storeData();  
  }

  consoleLogData() {
    this.currencies.forEach(currency => {
      console.log(currency);
    })
  }
  
  consoleLogFirebaseData() {
    const currenciesCollection =  `portfolio/${this.email}/currencies`;
    const firestore  = firebase.firestore();
    firestore.settings(this.firestoreConfig);

    const data = 
      firestore
        .collection(currenciesCollection)
        .orderBy("pair")
        .onSnapshot(dataSnapshot => {
          dataSnapshot.docs.forEach( doc => {
            //console.log(doc.data());
          })
          // console.log(dataSnapshot.docs);
        });
  }

  storeData() {
    //this.deleteData();
    //ADAM#2
    //async - storeData executes then this.deleteData completes erasing saved changes

    console.log("storeData");
    const firestore  = firebase.firestore();
    firestore.settings(this.firestoreConfig);
    this.currencies.forEach(key => {
      let docID  = `portfolio/${this.email}/currencies/${key.pair}` ;
      let docRef = firestore.doc(docID);
      console.log("saving " + docID)
      docRef.set(key)
        .then(result => {
        })
        .catch(error => {
        console.log("error saving data");
        });
    })  //forEach
  }

  loadData() {

    this.currencies = [];
    const firestore  = firebase.firestore();
    firestore.settings(this.firestoreConfig);
    let user = this.email || "no user";
    let currenciesCollection =  `portfolio/${user}/currencies`;
    let userCurrencies = firestore.collection(currenciesCollection);
    userCurrencies.get().then(function(querySnapshot) {
      if (!querySnapshot.empty) {
        querySnapshot.docs.forEach(doc => {
          this.currencies.push(doc.data());
        })
        // console.log("this = ",this);
        // console.log("currencies = ", this.currencies);
      } else {
        // console.log('no documents found');
      }
    }.bind(this));
    

    //retrieve document (works)
    // const firestore  = firebase.firestore();
    // firestore.settings(this.firestoreConfig);
    // let docID  = `portfolio/${this.email}/currencies/BC2` ;
    // let docRef = firestore.doc(docID);
    // console.log(docID);

    // docRef.get().then(function(doc) {
    //   if (doc && doc.exists) {
    //     console.log('got some data',doc.data());
    //   } else {
    //     console.log("no data");
    //   }
    // });


  }

  deleteData() {

    this.currencies = [];
    const firestore  = firebase.firestore();
    firestore.settings(this.firestoreConfig);

    let user = this.email || "no user";
    let currenciesCollection =  `portfolio/${user}/currencies`;
    let userCurrencies = firestore.collection(currenciesCollection);
    userCurrencies.get()
     .then(function(querySnapshot) {
       if (!querySnapshot.empty) {
         querySnapshot.docs.forEach(doc => {
         console.log("deleting:" + doc.ref);
         doc.ref.delete()
           .then(function() {
             console.log("Document deleted!");
           })
           .catch(function(error) {
             console.error("Error removing document: ", error);
           });
         }) //for each
       } else {
         console.log('no documents found');
       }
     }.bind(this));
    

  } //delete data


}