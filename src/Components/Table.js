import React from 'react'



export default function Table(props) {
  return (
   <div> 
    <li key={props.repo.id} className="repo_item">
              <a href={props.repo.html_url} target="">
                {props.repo.name}
              </a>
              <p >{props.repo.description}</p>
              <p >{props.repo.owner.login}</p>
   </li>
   </div>

  )
}
