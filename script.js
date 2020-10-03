const APIURL = 'https://api.github.com/users/';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getUser("Jarlei3m");

async function getUser(username) {
    const resp = await fetch(APIURL + username);
    const respData = await resp.json();

    createUserCard(respData);

    console.log(respData)

    getRepos(username);
};

async function getRepos(username) {
    const resp = await fetch(APIURL + username + '/repos');
    const respData = await resp.json();

    addReposToCard(respData);
};

function createUserCard(user) {

    const cardHTML = `
        <div class="card">
            <div>
                <a class="user-url" href="${user.html_url}" target="_blank">
                    <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
                </a>            
            </div>

            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>

                <ul class="info">
                    <li><i class="material-icons">people</i>${user.followers} Followers</li>
                    <li><i class="material-icons">connect_without_contact</i>${user.following} Following</li>
                    <li><i class="material-icons">folder_open</i>${user.public_repos} Repos</li>
                </ul>

                <h4>Repositories:</h4>
                <div id="repos">
                
                </div>
            </div>


        </div>
    `;

    getRepos();

    main.innerHTML = cardHTML;
};

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos');
    
    repos.sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(1, 11)
    .forEach(repo => {
        const repoEl = document.createElement('a');
        repoEl.classList.add('repo');

        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.innerText = repo.name;

        reposEl.appendChild(repoEl);
    });
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    gitIcon.classList.toggle('rotate')
    
    const user = search.value;

    if(user) {
        getUser(user);

        search.value = '';
    }
});

const gitIcon = document.querySelector('.search-bar i')
// gitIcon.addEventListener('click', () => {
    
// })
