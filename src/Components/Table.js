import React from 'react'

function Table(props) {
  return (
    <tr key={props.repo.id}>
      <th scope="row">{props.repo.id}</th>
      <td><a href={props.repo.html_url} target="">
        {props.repo.name}
      </a></td>
      <td>{props.repo.description}</td>
      <td>{props.repo.owner.login}</td>
      <td>{props.repo.stargazers_count}</td>
    </tr>

  )
}
export default Table