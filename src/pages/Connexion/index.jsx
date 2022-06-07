import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAtom } from 'jotai';
import {userAtom, authorizationAtom} from '../../stores/auth';


const Authentification = () => {

  const navigate = useNavigate();

  const [userapp, setUserapp] = useAtom(userAtom);
  const [emailapp, setEmailapp] = useState();
  const [passwordapp, setPasswordapp] = useState();
  const [authorizationapp, setAuthorizationapp] = useAtom(authorizationAtom);


  function FetchData(e){
    e.preventDefault();
 
    const data = {
      "user" :{
        "email": emailapp,
        "password": passwordapp
     }
    };

    fetch('http://localhost:3001/users/sign_in', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => {   
      setAuthorizationapp([...response.headers.get('authorization')].join(''));
      return response.json()
    })

    .then((response) => {
      setUserapp(response.user.id)
      navigate('/')
    })
  }

  return(
    <>
      <p>Se Connecter</p>
      <form onSubmit={FetchData}>
        <input type="text" placeholder='email' id="email" onChange={(e) => setEmailapp(e.target.value)}></input>
        <input type="text" placeholder='password' id="password" onChange={(e) => setPasswordapp(e.target.value)}></input>
        <button type='submit' >Envoyer</button>

      </form>
    </>
    
  )
}

export default Authentification;