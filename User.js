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
    this.activity = [{pair: "BTC", userCount: 4},{pair: "BCH", userCount: 2},
                     {pair: "ETC", userCount: 4},{pair: "XRP", userCount: 2},
                     {pair: "LTC", userCount: 1},{pair: "ETC", userCount: 0},
                     {pair: "STR", userCount: 1},{pair: "NXT", userCount: 5},
                     {pair: "ZEC", userCount: 0},{pair: "XMR", userCount: 4},
                     {pair: "DASH", userCount: 1},{pair: "REP", userCount: 3},
                    ];

}  //constructor
  
 
  async init(firebaseUser) {
    this.email = firebaseUser.email;
    await this.loadData();
  }

  login(email, password) {
    const auth = firebase.auth();
    return auth.signInWithEmailAndPassword(email,password);
  }

  logout() {
    this.email = "";
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

  async storeData() {
     await this.deleteData();

    const firestore  = firebase.firestore();
    firestore.settings(this.firestoreConfig);
    this.currencies.forEach(key => {
      let docID  = `portfolio/${this.email}/currencies/${key.pair}` ;
      let docRef = firestore.doc(docID);
      docRef.set(key)
        .then(result => {
        })
        .catch(error => {
        console.log("error saving data");
        });
    })  //forEach
  }

  async loadData() {

    this.currencies = [];
    const firestore  = firebase.firestore();
    firestore.settings(this.firestoreConfig);
    let user = this.email || "no user";
    let currenciesCollection =  `portfolio/${user}/currencies`;
    let userCurrencies = firestore.collection(currenciesCollection);
    await userCurrencies.get().then(function(querySnapshot) {
      if (!querySnapshot.empty) {
        querySnapshot.docs.forEach(doc => {
          this.currencies.push(doc.data());
        //  console.log("docdata:",doc.data());
        })
      } else {
        // console.log('no documents found');
      }
    }.bind(this));

  }

  async deleteData() {

    console.log("deleteData-start");
    const firestore  = firebase.firestore();
    firestore.settings(this.firestoreConfig);

    let user = this.email || "no user";
    let currenciesCollection =  `portfolio/${user}/currencies`;
    let userCurrencies = firestore.collection(currenciesCollection);
    await userCurrencies.get()
     .then(function(querySnapshot) {
       if (!querySnapshot.empty) {
         querySnapshot.docs.forEach(doc => {
         doc.ref.delete()
           .then(function() {
             //console.log("Document deleted!");
           })
           .catch(function(error) {
             console.error("Error removing document: ", error);
           });
         }) //for each
       } else {
         console.log('no documents found');
       }
     }.bind(this));
     console.log("deleteData-complete")
  } //delete data


}