//unordered list to display repo list
const repoList = document.querySelector(".repo-list");
//div where my profile information will appear
const profileOverview = document.querySelector(".overview");
const username = "rabi-b";

const getData = async function () {
    let res = await fetch(`https://api.github.com/users/${username}`);
    const userData = await res.json();
    console.log(userData);
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
    let res = await fetch(`  https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repos = await res.json();
    console.log(repos);
    displayRepos(repos);
};

const displayRepos = function (repos) {
    for (const singleRepo of repos) {
        const repoItem = document.createElement("li"); //create new variable and list item
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${singleRepo.name}</h3>`;
        repoList.append(repoItem);
    };
};