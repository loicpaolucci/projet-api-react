import React from "react";
import { Link } from "react-router-dom";
import { useAtom } from 'jotai';
import {userAtom, authorizationAtom} from '../../stores/auth';


const Header = () => {

  const [authorizationapp, setAuthorizationapp] = useAtom(authorizationAtom);
  const [id, setId] = useAtom(userAtom);

  const logout = () =>{
    fetch('http://localhost:3001/users/sign_out', {
      method: 'delete',
      headers: {
        'Authorization': authorizationapp,
        'Content-Type': 'application/json'
      },
    })
    .then((response) => {return response.json()})
    .then((response) => {
      setAuthorizationapp('');
      setId('');
      console.log(response);
    })
  }

  return(
    <header>
      <h1 className="title"><Link to='/'>Articles</Link></h1>
      <ul>
        <li><Link to='/'>Home</Link></li>
        {authorizationapp === ''?
        <>
          <li><Link to='/register'>S'inscrire</Link></li>
          <li><Link to='/login'>Se Connecter</Link></li> 
        </>
        :
         <li onClick={logout}>Se Déconnecter</li>
      }

      </ul>
    </header>
  )
}

export default Header;