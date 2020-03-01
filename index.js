const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
 
const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  inquirer.prompt({
  message: "Enter your GitHub username:",
  name: "username"
  })
  .then(function({ username }) {
    const queryURL = `https://api.github.com/users/${username}`;
    console.log (queryURL);

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
    "location":res.data.location,
    "profile_pic": res.data.avatar_url
    }
    console.log(gitStats);
    })
  });
};

promptUser();

