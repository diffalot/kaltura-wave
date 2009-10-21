var ksession = "none";

/**
* Prepare the JQuery for cross-domain ajax requests via flXHRproxy and register 
* the ajax start and end events to the loading gif.
*/
jQuery(document).ready(function() {
  jQuery.flXHRproxy.registerOptions('http://www.kaltura.com/',{xmlResponseText:true});
  jQuery.ajaxSetup({transport:'flXHRproxy'});
  $("#loading").hide();
  $("#loading").ajaxStart(function(){
    $(this).show();
  });
  $("#loading").ajaxStop(function(){
    $(this).hide();
  }); 
});

/**
* Global handler for successful requests. 
*/
function successHandler(data,status,XHRobj) {
  if (XHRobj.readyState == 4) {
    str = "readyState:"+XHRobj.readyState
        +"\nresponseText:"+XHRobj.responseText
        +"\nstatus:"+XHRobj.status
        +"\nstatusText:"+XHRobj.statusText
        +"\nSource Object Id: "+XHRobj.instanceId;
    kcllog ("Success", str);
    kcllog ("KS Generated", $(XHRobj.responseText).find('result').text());
    ksession = $(XHRobj.responseText).find('result').text();
    showContribute();
    document.getElementById("debugDiv").innerHTML += "<br />" + "in handler: " + ksession + "<br />";
  }
}

/**
* Global handler for errorness requests. 
*/
function errorHandler(XHRobj,errtype,errObj) {
  str = "Error: "+errObj.number
    +"\nType: "+errObj.name
    +"\nDescription: "+errObj.description
    +"\nSource Object Id: "+errObj.srcElement.instanceId;
  kcllog ("Error", str);
}

/**
* An easy logging method.
*/
function kcllog (message, log_data) {
  if (console.log) {
    console.log (message+":\n"+log_data);
  }
} 

/**
* Client base function to hit the kaltura server with sepcifc service, action and data.
* Results and errors are catched by the successHandler and errorHandler methods.
* @param kaltura_service	The kaltura service to query (e.g. session, user, partner, media, etc).
* @param kaltura_action		The action on the service to call, for example start on the session service.
* @param call_data			The key-value object to pass as the request post data.
*/
function kclhit(kaltura_service, kaltura_action, call_data) {
  requestObj = $.ajax({ 
    type:"POST", 
    aysnch:true,
    dataType:"xml",
    url:"http://www.kaltura.com/api_v3/index.php?service="+kaltura_service+"&action="+kaltura_action, 
    data:call_data,
    success:successHandler,
    error:errorHandler
  });
  kcllog ("Request", "id: "+requestObj.instanceId+"\nBinary result: "+requestObj.binaryResponseBody+"\nXML result: "+requestObj.xmlResponseText);
}

function getKalturaSession (kalturaPartnerId, kalturaPartnerSecret){
  getKSData = {
          partnerId: kalturaPartnerId,
          secret: kalturaPartnerSecret,
          userId: name,
          expiry: 36000,
          privileges: "edit:*",
          type: 0
        };
  kclhit ("session", "start", getKSData);
}

