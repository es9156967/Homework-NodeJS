const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer
  .prompt([  
{
    message: "Enter your GitHub username:",
    name: "username"
},
{
    type: "input",
    message: "What is your favorite color?",
    name:"color_name"
},
{
    type: "input",
    message: "What is your favorite hobby?",
    name:"hobby"
},
])
  .then(function({ username }) {
    const queryURL = `https://api.github.com/users/${username}`;

   axios 
  .get(queryURL)
  .then(function(res){
    const gitStats = {
    "name": res.data.name,
    "bio":res.data.bio,
    "blog":res.data.blog,
    "public_repos":res.data.public_repos,
    "followers":res.data.followers,
    "page_Url":res.data.html_url,
    "location":res.data.company,
    "profile_pic": res.data.avatar_url
    }

   var readme = generateReadMe(gitStats);
    writeFileAsync("Readme.md", readme);
    

    })

  });
};




function generateReadMe(gitStats) {
  return ` 
# Welcome to Git Hub Profile Generator 👋

> This is a project generator application that will input the users information based on their github username

##${gitStats.name} ##

👤 **${gitStats.name}**


<img src="${gitStats.profile_pic}" alt="avatar" style="border-radius: 16px" width="30 />

* Github: ${gitStats.page_Url}
* LinkedIn: ${gitStats.blog}
* Followers: ${gitStats.followers}
* Repos: ${gitStats.public_repos}

## 🤝 Contributing


## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [${gitStats.name}]().

This project is [MIT](MIT) licensed.`;
}

//Prompts the user to enter their information// 
promptUser()

//then collects the information and stores it an in input variable// 
 .then(function(gitStats) {
   const userInput= generateReadMe(gitStats);

   return writeFileAsync("README.md", userInput);
  })
  .then(function() {
    console.log("Successfully wrote Readme.md");
  })
  .catch(function(err) {
    console.log(err);
  });