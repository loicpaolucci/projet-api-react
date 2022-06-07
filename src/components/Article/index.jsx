import React from "react";
import { useAtomValue } from "jotai";
import {userAtom,authorizationAtom} from '../../stores/auth';


const Article = (props) => {

  const id = useAtomValue(userAtom);
  const authorizationapp = useAtomValue(authorizationAtom);

  const deletearticle = () => {
    fetch(`http://localhost:3001/articles/${props.data.id}`, {
        method: 'delete',
        headers: {
         'Content-Type': 'application/json'
        }
      })
      .then((response) => console.log(response))
  }

  function UpdatePost(e) {
    const data = {
      "article":{
        "title": document.getElementById(`title${props.data.id}`).value,
        "content": document.getElementById(`content${props.data.id}`).value,
        "user_id": id
      }
    }

    console.log(data)
    e.preventDefault();
    fetch(`http://localhost:3001/articles/${props.data.id}`, {
      method: 'put',
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
      <p><em>{props.data.title}</em></p>
      <p>{props.data.content}</p>
      {props.data.user_id === id?
      <>
        <button onClick={deletearticle}>Delete</button>
        <form onSubmit={UpdatePost}>
            <input type="text" placehorder="votre article" id={"title" + props.data.id}></input>  
            <input type="text" placehorder="votre article" id={"content" + props.data.id}></input>  
            <button type="submit">Envoyer</button>
          </form> 
      </>
      :
      null}
      <p>--------------------------</p>
    </>
  )
}

export default Article;