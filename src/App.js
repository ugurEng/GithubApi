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
          Unexpected Error Occurred fetching data. Please try again later!
        </div>
      )}
      <ul className="repo_list">
        {repos.map(repo => {
          return (
            <Table key={repo.id} repo={repo} />
          );
        })}
      </ul>
      {paginate && <Paginate />}
    </div>
  );
}

export default App;
