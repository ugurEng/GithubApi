import React from "react";
import "./App.css";
import Table from "./Components/Table";
import Paginate from "./Components/Paginate";

function App() {
  const [inputValue, setInputValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [paginate, setPaginate] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [repos, setRepos] = React.useState([]);

  repos.forEach(element => console.log(element.lenght));

  React.useEffect(() => {
    if (!inputValue) {
      return;
    }
    setIsLoading(true);
    setPaginate(true)
    // make API calls
    fetch("https://api.github.com/search/repositories?q=" + inputValue + "+language:assembly&sort=stars&order=desc")
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        setIsLoading(false);
        setRepos(data.items);
      })
      .catch(err => {
        setIsLoading(false);
        setError(true);
        console.error(err);
      });
  }, [inputValue]);

  return (
    <div className="container">
      <form
        onSubmit={evt => {
          evt.preventDefault();
          setInputValue(evt.target.elements.query.value);
        }}
      >
        <input
          type="text"
          name="query"
          className="github_search_input"
          placeholder="Search on Github"
        />
      </form>
      {isLoading && <div>Please Wait Loading...</div>}
      {error && (
        <div>
          Unexpected Errord Occurred fetching data. Please try again later!
        </div>
      )}
      <table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Project Name</th>
      <th scope="col">Descrfition|</th>
      <th scope="col">Owner</th>
      <th scope="col">Stars</th>
    </tr>
  </thead>
  <tbody>
  {repos.map(repo => {
          return (
            <Table key={repo.id} repo={repo} />
          );
        })}
  </tbody>
</table>

      {paginate && <Paginate />}
    </div>
  );
}

export default App;
