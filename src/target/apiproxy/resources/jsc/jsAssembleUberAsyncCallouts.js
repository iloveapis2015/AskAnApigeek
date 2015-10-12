// fetch responses to the  callouts made to storeid in previous steps


totalUberUrls = context.getVariable("totalUberUrls");

for(var i=0;i<totalUberUrls;i++)
{
	var uberCall = getUberCalloutResponse('uberCall'+i);
	context.setVariable('uberCall'+i,uberCall);
}

function getUberCalloutResponse(name) {
	var exchange = context.session[name];
		exchange.waitForComplete(30000);
if (exchange.isSuccess()) {
var resp = exchange.getResponse();
		// check the status code
if (resp.status==200) {
	return resp.content;
}
throw "Failed to connect to "+name+". Status code is " + resp.status;
}
throw "Connection timed out OR Failed to connect to " + name + ". Error is {" + exchange.getError() + "} ";
}
