class User {
  constructor() {
    this.displayName = "";
    this.email = "";
    this.isLoggedIn = false;
    this.config =  {
      apiKey: "AIzaSyCD6vBIGCeiq5D3w15RYejADy9TvjqEAd8",
      authDomain: "litaf-dc21b.firebaseapp.com",
      databaseURL: "https://litaf-dc21b.firebaseio.com",
      projectId: "litaf-dc21b",
      storageBucket: "litaf-dc21b.appspot.com",
      messagingSenderId: "578563414046"
    }

  }  //constructor
  
  init(firebaseUser) {
    this.email = firebaseUser.email;
  }

  login(email, password) {
    const auth = firebase.auth();
    return auth.signInWithEmailAndPassword(email,password);
  }

  signUp(email,password) {
    const auth = firebase.auth();
    return auth.createUserWithEmailAndPassword(email,password);
  }

}