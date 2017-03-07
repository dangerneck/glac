var axios = require('axios');
var pdfkit = require('pdfkit');
var mg = require('mailgun-js')({ apiKey: '###', domain: '###'});
var nano = require('nano')("###")
    , username = '###'
    , userpass = '###'
    , cookies = {}
    , storedEvent = {}
    , storedContext = {}
    , pdfBuffer = null
    ;

function CustomError(message, somethingElse) {
    var error = Error.call(this, message);   
    this.name = 'CustomError';
    this.message = error.message;
    this.stack = error.stack;
    this.customProperty = somethingElse;
}
CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.constructor = CustomError;

var stringifyEventForEmail = function () { // I want this to be nice & readable enough for the artist not just myself
    return "Name: " + storedEvent.name +
        "\nEmail: " + storedEvent.email +
        "\nAddress: " + storedEvent.address +
        "\nPhone: " + storedEvent.phone +
        "\nSize: " + storedEvent.size +
        "\nLayout: " + storedEvent.layout +
        "\nFavouriteColour: " + storedEvent.favouriteColour +
        "\nWhen needed: " + storedEvent.dateTimeNeeded +
        "\nOther Size (if entered): " + storedEvent.otherSizeValue;
};

// ---------------------------------------------------------------------------------------- //
exports.handler = function (event, context, callback) {
    if (event != null) {
        console.log('event = ' + JSON.stringify(event));
        storedEvent = event;
        storedContext = context;

        var promiseChain = new Promise(function (resolve, reject) { // couchdb auth
            console.log("starting couchdb auth");
            nano.auth(username, userpass, function (err, body, headers) {
                if (err) {
                    console.log("rejecting couchdb auth");
                    reject(err);
                }
                if (headers && headers['set-cookie']) {
                    cookies['user'] = headers['set-cookie'];
                }
                console.log("resolving couchdb auth");
                resolve();
            });
        }).then(function (r) {
            return new Promise(function (resolve, reject) { // insert doc to couchdb
                console.log("starting couchdb insert");
                var gla = require('nano')(
                    { url: '###', cookie: cookies['user'][1] }); // prob check which is authsession cookie rather than assuming its the second one.
                var doc = {
                    name: storedEvent.name,
                    email: storedEvent.email,
                    address: storedEvent.address,
                    phone: storedEvent.phone,
                    size: storedEvent.size,
                    layout: storedEvent.layout,
                    favouriteColour: storedEvent.favouriteColour,
                    dateTimeNeeded: storedEvent.dateTimeNeeded,
                    otherSizeValue: storedEvent.otherSizeValue,
                    created: new Date().toString()
                };
                gla.insert(doc, function (err, body, headers) {
                    if (err) {
                        console.log("rejecting couchdb insert");
                        reject(err);
                    }
                    if (headers && headers['set-cookie']) {
                        cookies['user'] = headers['set-cookie'];
                    }
                    console.log("resolving couchdb insert");
                    resolve();
                });
            });
        }).then(function (r) { 
            return new Promise(function (resolve, reject) { // generate pdf
                console.log("starting generate pdf");
                var doc = new pdfkit();
                doc.rect(0, 0, doc.page.width, doc.page.height).fill('#a5f7f0');
                doc.fill("#405358");
                doc.font('Helvetica-Bold');
                var propertyStyle = { width: 400, align: 'left', indent: 70, lineBreak: false, continued: true };
                var valueStyle = {  align: 'right', indent: 0, lineBreak: true };
                var logoBase64 = "###";
                doc.image(logoBase64, 0, 0, { width: doc.page.width }).moveDown(10);
                doc.fontSize(32).text("Commission Request", { align: 'center' });
                doc.moveDown(0.5);
                doc.fontSize(16).font("Helvetica-Bold").text('Name:  ', propertyStyle);
                doc.font("Helvetica").text(storedEvent.name, valueStyle).moveDown();
                doc.font("Helvetica-Bold").text('Email:  ', propertyStyle);
                doc.font("Helvetica").text(storedEvent.email, valueStyle).moveDown();
                doc.font("Helvetica-Bold").text('Address:  ', propertyStyle);
                doc.font("Helvetica").text(storedEvent.address, valueStyle).moveDown();
                doc.font("Helvetica-Bold").text('Phone:  ', propertyStyle);
                doc.font("Helvetica").text(storedEvent.phone, valueStyle).moveDown();
                doc.font("Helvetica-Bold").text('Size:  ', propertyStyle);
                doc.font("Helvetica").text(''+storedEvent.size + (storedEvent.size == 'Other' ? ' - ' + storedEvent.otherSizeValue : ''), valueStyle).moveDown();
                doc.font("Helvetica-Bold").text('Layout:  ', propertyStyle);
                doc.font("Helvetica").text(storedEvent.layout, valueStyle).moveDown();
                doc.font("Helvetica-Bold").text('Favourite Colour:  ', propertyStyle);
                doc.font("Helvetica").text(storedEvent.favouriteColour, valueStyle).moveDown();
                doc.font("Helvetica-Bold").text('Time Needed:  ', propertyStyle);
                doc.font("Helvetica").text(storedEvent.dateTimeNeeded, valueStyle).moveDown();
                doc.end();

                var buffers = [];
                doc.on('data', buffers.push.bind(buffers));
                doc.on('end', function () {
                    var file = Buffer.concat(buffers);

                    console.log("resolving generate pdf");
                    resolve(file);
                });
            });
        }).then(function (file) { 
            return new Promise(function (resolve, reject) { // send success email with pdf attached
                console.log("starting succes email");
                var attachmentPDF = new mg.Attachment({ data: file, filename: 'GabbyLovesArtCommissionRequest.pdf', contentType: 'application/pdf' });
                var email = {
                    from: '###',
                    to: '###',
                    subject: 'Completed commissions function invocation',
                    text: stringifyEventForEmail(),
                    attachment: attachmentPDF
                };

                mg.messages().send(email, function (error, body) {
                    if (!error) {
                        console.log("resolving success email");
                        resolve();
                    } else {
                        console.log("rejecting success email");
                        reject(error);
                    }
                });
            });
        }).then(function (r) {
            storedContext.done(null, 'Succeeded');// complete function successfully
        }).catch(function (err) { // handle error, send error email
            var email = {
                from: '###',
                to: '###',
                subject: 'Failed commissions function invocation',
                text: stringifyEvent() + '\n\n' + err
            };

            mg.messages().send(email, function (error, body) {
                storedContext.done(null, 'Failed');  // complete function unsuccesfully
            });       
        });
    }
    else {
        storedContext.done(null, 'Failed, no event provided'); // complete function unsuccesfully
    }
};

