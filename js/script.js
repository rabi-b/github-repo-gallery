//back to repo galley button
const viewReposButton = document.querySelector(".view-repos");
//search repos
const filterInput = document.querySelector(".filter-repos")
//repos information
const reposInfo = document.querySelector(".repos");
//individual repo data
const repoData = document.querySelector(".repo-data")
//unordered list to display repo list
const repoList = document.querySelector(".repo-list");
//div where my profile information will appear
const profileOverview = document.querySelector(".overview");
const username = "rabi-b";

const getData = async function () {
    let res = await fetch(`https://api.github.com/users/${username}`);
    const userData = await res.json();
    //console.log(userData);
    displayData(userData);
};

getData();

const displayData = function (userData) {
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    userInfo.innerHTML = ` 
    <figure>
      <img alt="user avatar" src=${userData.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${userData.name}</p>
      <p><strong>Bio:</strong> ${userData.bio}</p>
      <p><strong>Location:</strong> ${userData.location}</p>
      <p><strong>Number of public repos:</strong> ${userData.public_repos}</p>
    </div>` ;
    profileOverview.append(userInfo);
    getRepos()
}

const getRepos = async function () {
    let res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    let repos = await res.json();
    //console.log(repos);
    displayRepos(repos);
};

const displayRepos = function (repos) {
    filterInput.classList.remove("hide")
    for (const singleRepo of repos) {
        const repoItem = document.createElement("li"); //create new variable and list item
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${singleRepo.name}</h3>`;
        repoList.append(repoItem);
    };
};

repoList.addEventListener("click", function (e) {
    //conditional statement for repo item with h3 element
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        selectRepoInfo(repoName);
    };
});

const selectRepoInfo = async function (repoName) {
    let res = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await res.json();
    //console.log(repoInfo);
    const fetchLanguages = await fetch(repoInfo.languages_url); //fetch data from a property
    const languageData = await fetchLanguages.json();
    //console.log(languageData);
    const languages = [];
    for (const singleLanguage in languageData) {
        languages.push(singleLanguage);
        console.log(languages);
    };
    displayRepoInfo(repoInfo, languages)
};

const displayRepoInfo = async function (repoInfo, languages) {
    repoData.innerHTML = "" //remember the .innerHTML!!
    const repoDisplayDiv = document.createElement("div");
    repoDisplayDiv.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(repoDisplayDiv);
    repoData.classList.remove("hide");
    reposInfo.classList.add("hide");
    viewReposButton.classList.remove("hide");
};

viewReposButton.addEventListener("click", function () {
    reposInfo.classList.remove("hide");
    repoData.classList.add("hide");
    viewReposButton.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
    const inputValue = e.target.value; //not targeting innerText
    //console.log(inputValue);
    let repos = document.querySelectorAll(".repo");
    const lowerCaseInput = inputValue.toLowerCase();

    for (const repo of repos) {
        const lowerCaseRepo = repo.innerText.toLowerCase();
        if (lowerCaseRepo.includes(lowerCaseInput)) {
            repo.classList.remove("hide"); //reference the repo itslef, not its text
        } else {
            repo.classList.add("hide");
        };
    };

});