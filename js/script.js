//div where my profile information will appear
const profileOverview = document.querySelector(".overview");
const username = "rabi-b";

const getData = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
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
}