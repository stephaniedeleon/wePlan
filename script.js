function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // makes log in invisible and log out visible
    document.getElementById("signin").classList.add("hidden");
    document.getElementById("signout").classList.remove("hidden");

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);

    // Shows the welcome and name of user!
    var welcomeEl = document.querySelector('#welcome')
    welcomeEl.innerText = "Welcome " + profile.getGivenName() + "!";
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
        console.log('User signed out.');
    });

    // makes log-in visible and log-out invisible
    document.getElementById("signin").classList.remove("hidden");
    document.getElementById("signout").classList.add("hidden");

    // Removes Welcome
    var welcomeEl = document.querySelector('#welcome')
    welcomeEl.innerText = "";
}

/* Task */

import LocalStorage from './LocalStorage.js';

const storage = new LocalStorage();
const tasks = storage.tasks;

const container = document.querySelector('.tasks');
const template = document.querySelector('#task');

const createTaskForm = document.querySelector('.create-task');
const creatTaskField = document.querySelector('.create-task_textarea');
const createTaskButton = document.querySelector('.create-task_submit');

function onCreateTask({ data }) {
    const clone = template.contect.cloneNode(true);

    const task = clone.querySelector('.task');
    const checkbox = clone.querySelector('.task_checkbox');
    const title = clone.querySelector('.task_text');
    const del = clone.querySelector('.task delete');

    title.innerHTML = data.value;
    checkbox.checked = data.checked;

    toggleTaskStatusClass({ checked: data.checked, task });

    checkbox.addEventListener('input', () => {
            data.checked = checkbox.checked;

            toggleTasksStatusClass({ checked: data.checked, task };

                storage.update(data);
            }); title.addEventListener('input', () => {
            data.value = title.innerHTML;

            storage.update(data);
        });

        del.addEventListener('click', (e) => {
            storage.delete(data);
            task.remove();
        });

        container.appendChild(clone);
    }

    function toggleTaskStatusClass({ checked, task }) {
        task.classList[checked ? 'add' : 'remove']('task--done');
    }

    tasks.forEach((data) => {
        onCreateTask({ data });
    });

    createTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const value = createTaskField.value;

        if (value) {
            const data = {
                value;
                checked: false
            };
            storage.create(data);
            onCreateTask({ data });
            createTaskForm.reset();
        }
    });

