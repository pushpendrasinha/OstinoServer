var http = require('http'),
    fs = require('fs'),
    ccav = require('./ccavutil.js'),
    qs = require('querystring');
    config = require('./config-util').nodeConfig;

    function getEndpoint(merchant_id, encRequest, accessCode) {
      //  var api_endpoint = config.get('paymentGateway:iframe_api_endpoint');
        var api_endpoint = `https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=${merchant_id}&encRequest=${encRequest}&access_code=${accessCode}`;
        return api_endpoint;
    }

exports.getIframeURL = function(formdata){
    var body = '',
        merchant_id = config.get('paymentGateway:merchant_id')
        workingKey = config.get('paymentGateway:workingKey'),		//Put in the 32-Bit key shared by CCAvenues.
        accessCode = config.get('paymentGateway:accessCode'),		//Put in the access code shared by CCAvenues.
        encRequest = '',
        formbody = '';
    encRequest = ccav.encrypt(formdata, workingKey);
    //POST =  qs.parse(formdata);
    var endpoint = getEndpoint(merchant_id, encRequest, accessCode);
    console.log("endpoint is " + endpoint);
    return endpoint;

/*    request.on('data', function (data) {
        console.log("data is " + data);
        console.log("----------------------");
        body += data;
        encRequest = ccav.encrypt(body,workingKey);
        POST =  qs.parse(body);
        formbody = '<html><head><title>Sub-merchant checkout page</title><script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script></head><body><center><!-- width required mininmum 482px --><iframe  width="482" height="500" scrolling="No" frameborder="0"  id="paymentFrame" src="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id='+POST.merchant_id+'&encRequest='+encRequest+'&access_code='+accessCode+'"></iframe></center><script type="text/javascript">$(document).ready(function(){$("iframe#paymentFrame").load(function() {window.addEventListener("message", function(e) {$("#paymentFrame").css("height",e.data["newHeight"]+"px"); }, false);}); });</script></body></html>';
    });

    request.on('end', function () {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(formbody);
        response.end();
    });
    return;*/
};
