var fourSqResponse = JSON.parse(context.getVariable("response.content"));
var mashedArray = [];
//NOTE - some sensitive information like tokens and apikey,secrets etc are hardcoded here.
//For best practices we might want to store them in a secure store like KVM or Vault provided by Apigee
var headers = {Authorization : 'Token ' +  'oQrP25aPXcalbZQqgDM6C-svEEFVUWSD-MGoI0ar'};
var uberUrlArray = [];

//Fetch 5 top(max) responses from FourSquare
for(var i=0;i<5;i++)
{

	if(fourSqResponse.response.groups[0].items[i])
	{

		var fourSquareObject = {};

		if(fourSqResponse.response.groups[0].items[i].venue.name)
	    {
	    	fourSquareObject.name = fourSqResponse.response.groups[0].items[i].venue.name;
	    }
	    if(fourSqResponse.response.groups[0].items[i].venue.url)
	    {
          fourSquareObject.url = fourSqResponse.response.groups[0].items[i].venue.url;
        }
	    if(fourSqResponse.response.groups[0].items[i].venue.specials.items[0].message)
	    {
          fourSquareObject.specials = fourSqResponse.response.groups[0].items[i].venue.specials.items[0].message;
	    }
	    mashedArray.push(fourSquareObject);
	    fourSquareVenueLat = fourSqResponse.response.groups[0].items[i].venue.location.lat;
	    fourSquareVenueLng = fourSqResponse.response.groups[0].items[i].venue.location.lng;
	    var uberUrl = "https://api.uber.com/v1/estimates/price?start_latitude=37.338208&start_longitude=-121.886329"+"&end_latitude=" + fourSquareVenueLat + "&end_longitude=" + fourSquareVenueLng;
	    uberUrlArray.push(uberUrl);
	}

}

context.setVariable("mashedArray",JSON.stringify(mashedArray));
context.setVariable("uberUrlArray",JSON.stringify(uberUrlArray));
context.setVariable("totalUberUrls",uberUrlArray.length);

//Make multiple ASYNC callouts to Uber to fetch fares for the above 5 locations suggested by FourSquare

for(var i=0;i<uberUrlArray.length;i++)
{
	var uberUrl = uberUrlArray[i];
	var uberReq = new Request(uberUrl,"GET",headers);
	var uberCall = httpClient.send(uberReq);
	context.session['uberCall'+i] = uberCall;

}
