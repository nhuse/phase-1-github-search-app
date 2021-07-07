document.addEventListener('DOMContentLoaded', () => {
    getUserName();
})

function getUserName() {
    document.querySelector('#github-form').addEventListener('submit', event => {
        event.preventDefault();
        document.querySelector('#user-list').innerHTML = '';
        let userName = event.target.search.value;
        fetch(`https://api.github.com/search/users?q=${userName}`)
        .then(resp => resp.json())
        .then(json => appendUserInfo(json));

        document.querySelector('#github-form').reset();
    })
}

function appendUserInfo(user) {
    user.items.forEach(user => {
        console.log(user);
        let divContainer = document.createElement('div');
        let avatarImg = document.createElement('img');
        let h2UserName = document.createElement('h2');
        let pURL = document.createElement('p')
        let li = document.createElement('li');

        divContainer.className = 'github-container';
        avatarImg.className = 'avatar-image'
        h2UserName.className = 'username'
        pURL.className = 'user-url'
        li.className = 'user-info';

        avatarImg.src = user.avatar_url;
        h2UserName.textContent = user.login;
        pURL.textContent = user.html_url;

        divContainer.append(h2UserName, avatarImg, pURL);
        li.append(divContainer);

        document.querySelector('#user-list').append(li);

        divContainer.addEventListener('click', () => {
           appendUserReps(user);
        });
    });
}

function appendUserReps(user) {
    let userName = user.login;
    document.querySelector('#user-list').innerHTML = '';
    fetch(`https://api.github.com/users/${userName}/repos`)
    .then(resp => resp.json())
    .then(json => json.forEach(createRepsList))
}

function createRepsList(repsObj) {
    let divContainer = document.createElement('div');
    let h2Name = document.createElement('h2');
    let h4URL = document.createElement('h4')
    let li = document.createElement('li');

    divContainer.className = 'repo-info';
    h2Name.className = 'repo-name';
    h4URL.className = 'repo-url';
    li.className = 'repo-li';

    h2Name.textContent = repsObj.name;
    h4URL.textContent = repsObj.html_url;

    li.append(h2Name, h4URL);
    divContainer.append(li);
    document.querySelector('#user-list').append(li);
}