const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
var pdf = require('html-pdf');
 
const writeFileAsync = util.promisify(fs.writeFile);

function promptuser() {
  inquirer.prompt({
  message: "Enter your GitHub username:",
  name: "username"
  })
};