import React, { useEffect, useState } from "react";
import Article from '../../components/Article';
import { useAtomValue } from "jotai";
import {userAtom,authorizationAtom} from '../../stores/auth';
import { Link } from "react-router-dom";

const Home = () =>{

  const [articles, setArticles] = useState([]);
  const id = useAtomValue(userAtom);
  const authorizationapp = useAtomValue(authorizationAtom);


  useEffect(
    () => {
      fetch('http://localhost:3001/articles', {
        method: 'get',
        headers: {
         'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setArticles(response)
      })
    }, []

  )


  function CreatePost(e) {
    const data = {
      "article":{
        "title": document.getElementById('title').value,
        "content": document.getElementById('content').value,
        "user_id": id
      }
    }
    e.preventDefault();
    fetch(`http://localhost:3001/articles`, {
      method: 'post',
      headers: {
        'Authorization': authorizationapp,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
    });
  }

  return(
    <>
      <h1>Bienvenue sur Articles</h1>

      {id !== ''?
        <>
          <p>Partagez avec nous votre premier article !</p>
          <form onSubmit={CreatePost}>
            <input type="text" placehorder="votre article" id="title"></input>  
            <input type="text" placehorder="votre article" id="content"></input>  
            <button type="submit">Envoyer</button>
          </form>
        </>
        
      :
      <>
        <Link to="/register">S'inscrire</Link><br></br>
        <Link to="/login">Se connecter</Link> 
      </>
      }



      <p>{articles.map(article => <Article data={article} key={article.id}/>)}</p>
    </>
  )
}

export default Home;