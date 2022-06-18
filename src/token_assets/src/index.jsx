import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App";
import { AuthClient } from "@dfinity/auth-client"

const init = async () => { 
  const authClient = await AuthClient.create();

  if(authClient.isAuthenticated()){
    handleAuthenticated(authClient)
  } else {
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        handleAuthenticated(authClient)
      }
    })
  }
}

const handleAuthenticated = async (authClient) => {
  const identity = await authClient.getIdentity();
  const userPrincipal = await identity._principal.toString();
  console.log('user principal', userPrincipal);

  ReactDOM.render(<App userPrincipal={userPrincipal} />, document.getElementById("root"));
}

init();


