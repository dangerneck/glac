# Commission Request Form for Gabby Love Art

This project contains the following discrete parts:

- Vue.js Front End
- AWS Lambda Node.js function

The purpose of this project is to provide a simple single-page commission request form to allow potential patrons to contact the artist for a commission in a constrained and structured way with those constraints and structures defined by the artist.

This is intended to be as lightweight, quick, efficient and frictionless as possible -- from a development, hosting and user-experience perspective.



## Vue.js Front-end

This is a single page form wrapped in a single (`commissionsForm.vue`) component. It's a pretty typical Vue/Vuex form submitting data to an AWS API endpoint which will trigger the code in the Lambda Node.js function. 

`GLACommissionsVueFrontEnd/src/store.js` contains Vuex code

`GLACommissionsVueFrontEnd/src/components/commissionsForm.vue` contains most of the html



If you have vue-cli installed you can spin this up locally with the `npm run dev` command from the `GLACommissionsVueFrontEnd/` directory

## AWS Lambda Node.js function

This function does the following:

- Receives commission data and stores it in a CouchDB database as a fallback and backup measure
- Uses pdfkit to construct a user-friendly Commission Request PDF for the artist (and potentially the patron)
- Sends the PDF in an email with a plain-text copy of the data within the email.


`GLACommissionLambdaFunc/app.js` contains the handler code for the Lambda function.

`_sampleEvent.json` is used by `_testdriver.js` to easily run the code locally to test.

