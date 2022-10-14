import './App.css';
import { useEffect, useState } from 'react';
//to use firebase auth and 3rd party auth
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
// to use firebase.init.js file
import app from './Firebase/Firebase.init';

const auth = getAuth(app);

function App() {
  // for google and github auth set
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  //handle google and github popup signup functionality from firebase
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error => {
        console.error('error: ', error);
      })
  }

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error => {
        console.error('error: ', error)
      })
  }

  // to check data change 
  const [user, setUser] = useState({})
  useEffect(() => {
    console.log(user);
  }, [user])

  /// to handle auth sign out operation
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch(() => {
        setUser({})
      })
  }


  return (
    <div className="App">
      {
        // unique uid to perform sign in and sign out operation
        user.uid ? <button onClick={handleSignOut}>Sign Out</button> : <div><button onClick={handleGoogleSignIn}>Google Sing In</button><button onClick={handleGithubSignIn}>Github Sing In</button></div>
      }
      {
        //unique uid + && => to show if unique uid found
        user.uid && <div>
          <h3>User name: {user.displayName}</h3>
          <p>Email address: {user.email}</p>
          <img src={user.photoURL} alt="" />
        </div>
      }
    </div>
  );
}

export default App;


