function generateMarkdown(inquirerAnswers, githubInfo) {
 // generate table of contents

 let tableOfContents = `
 ## Table of Contents
 `;

 if (inquirerAnswers.installation !== '') {
   tableOfContents += `
 * [Installation](#installation)` };

 if (inquirerAnswers.usage !== '') {
   tableOfContents += `
 * [Usage](#usage)` };

 if (inquirerAnswers.contributing !== '') {
   tableOfContents += `
 * [Contributing](#contributing)` };

 if (inquirerAnswers.tests !== '') {
   tableOfContents += `
 * [Tests](#tests)` };


 // work through each section and append appropriate markdown.

 let markdown =
   `# ${inquirerAnswers.title}
 
 ## Description 
 
 *Description:* 
 
 ${inquirerAnswers.description}
 `

 // add the table of contents

 markdown += tableOfContents;

 // add license section to table of contents

 markdown += `

 * [License](#license)`;


 // installation section to add

 if (inquirerAnswers.installation !== '') {

   markdown +=
     `
 
 ## Installation
 
 *Steps to install project:*
 
 ${inquirerAnswers.installation}`
 };

 // usage section to add
 if (inquirerAnswers.usage !== '') {

   markdown +=

     `
 
 ## Usage 
 
 *Usage information for project:*
 
 ${inquirerAnswers.usage}`
 };


 // contribution section
 if (inquirerAnswers.contributing !== '') {

   markdown +=

     `

 ## Contributing
 
 *Contribution instructions:*
 
 ${inquirerAnswers.contributing}`
 };


 // tests section
 if (inquirerAnswers.tests !== '') {

   markdown +=
     `
 
 ## Tests
 
 *Testing Information:*
 
 ${inquirerAnswers.tests}`
 };


 // license section
 markdown +=
   `
 
 ## License
 
 ${inquirerAnswers.license}
 `;

 // question/dev section
 let developer =
   `
 ---
 
 ## Questions?  
 For any questions, please contact me at:

 GitHub: [@${githubInfo.login}](${githubInfo.url})
 Email: @${inquirerAnswers.email}
 `;

  markdown += developer;
  return markdown;

}

module.exports = generateMarkdown;
