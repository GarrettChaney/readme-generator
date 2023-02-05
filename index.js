// external imports
const inquirer = require('inquirer');
const fs = require('fs');

// internal imports
const generateMarkdown = require('./utils/generateMarkdown.js');
const api = require('./utils/api.js');

// list of applicable licenses
const licenses = {
    'None': 'none',
    'Apache License 2.0': 'Apache-2.0',
    'GNU General Public License v3.0': 'GPL-3.0',
    'MIT License': 'MIT',
    'BSD 2-Clause "Simplified" License': 'BSD-2',
    'BSD 3-Clause "New" or "Revised" License': 'BSD-3',
    'Boost Software License 1.0': 'BSL-1.0',
    'Creative Commons Zero v1.0 Universal':'CC0-1.0',
    'Eclipse Public License 2.0':'EPL-2.0',
    'GNU Affero General Public License v3.0': 'AGPL-3.0',
    'GNU General Public License v2.0': 'GPL-2.0',
    'GNU Lesser General Public License v2.1': 'LGPL-2.1',
    'Mozilla Public License 2.0': 'MPL-2.0',
    'The Unlicense':'Unlicense',
};

// questions supplied for the user to process
const inquirerQuestions = [
    {
        type: 'input',
        message: 'Project Title:',
        name: 'title',
    },
    {
        type: 'input',
        message: 'Project Description:',
        name: 'description',
    },
    {
        type: 'input',
        message: 'Installation Instructions:',
        name: 'installation',
    },
    {
        type: 'input',
        message: 'Usage Information:',
        name: 'usage',
    },
    {
        type: 'input',
        message: 'Contribution Guidelines:',
        name: 'contribution',
    },
    {
        type: 'input',
        message: 'Tests:',
        name: 'tests',
    },
    {
        type: 'list',
        message: 'Select License:',
        choices: Object.keys(licenses),
        name: 'license',
    },
    {
        type: 'input',
        message: 'GitHub Username:',
        name: 'username',
    },
    {
        type: 'input',
        message: 'Email Address:',
        name: 'email',
    },
];

// function to write the supplied information to a specified document
const writeToFile = (fileName, data) => {
    fs.writeFile(fileName, data, err => {
        if (err) {
            return console.log(err)
        }
        console.log("Success. README generated.")
    })
}

// initialize the application
const init = async () => {
    try {

        // fire inquirer questions.
        const inquirerAnswers = await inquirer.prompt(inquirerQuestions);
        console.log("Your responses: ", inquirerAnswers);
    
        // ping the github api to return user information.
        const githubInfo = await api.getUser(inquirerAnswers);
        console.log("Your GitHub user info: ", githubInfo);
    
        // send the information gathered to generateMarkdown.js
        console.log("Generating your README.md...")
        const toMarkdown = generateMarkdown(inquirerAnswers, githubInfo);
        console.log(toMarkdown);
    
        // write the information to the file
        await writeToFile('ExampleREADME.md', toMarkdown);

    } catch (error) {
        console.log(error);
    }
};

// function call to initialize application
init();
