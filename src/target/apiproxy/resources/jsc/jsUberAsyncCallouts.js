var fourSqResponse = JSON.parse(context.getVariable("response.content"));
var mashedArray = [];
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

//Make multiple callouts to Uber to fetch fares for the above 5 locations suggested by FourSquare

for(var i=0;i<uberUrlArray.length;i++)
{
	var uberUrl = uberUrlArray[i];
	var uberReq = new Request(uberUrl,"GET",headers);
	var uberCall = httpClient.send(uberReq);
	context.session['uberCall'+i] = uberCall;

}







// //var fourSqResponse = JSON.parse(context.getVariable("response.content"));
// var fourSquareVenueName0 = fourSqResponse.response.groups[0].items[0].venue.name;
// var fourSquareVenueUrl0 = fourSqResponse.response.groups[0].items[0].venue.url;
// var fourSquareVenueSpecialMessage0 = fourSqResponse.response.groups[0].items[0].venue.specials.items[0].message;
// var fourSquareVenueLat0 = fourSqResponse.response.groups[0].items[0].venue.location.lat;
// var fourSquareVenueLng0 = fourSqResponse.response.groups[0].items[0].venue.location.lng;


// var fourSquareVenueName1 = fourSqResponse.response.groups[0].items[1].venue.name;
// var fourSquareVenueUrl1 = fourSqResponse.response.groups[0].items[1].venue.url;
// var fourSquareVenueSpecialMessage1 = fourSqResponse.response.groups[0].items[1].venue.specials.items[0].message;
// var fourSquareVenueLat1 = fourSqResponse.response.groups[0].items[1].venue.location.lat;
// var fourSquareVenueLng1 = fourSqResponse.response.groups[0].items[1].venue.location.lng;


// // var fourSquareVenueName2 = fourSqResponse.groups[0].items[2].venue.name;
// // var fourSquareVenueUrl2 = fourSqResponse.groups[0].items[2].venue.url;
// // var fourSquareVenueSpecialMessage2 = fourSqResponse.groups[0].items[2].venue.specials.items[0].message;
// // var fourSquareVenueLat2 = fourSqResponse.groups[0].items[2].venue.location.lat;
// // var fourSquareVenueLng2 = fourSqResponse.groups[0].items[2].venue.location.lng;


// // var fourSquareVenueName3 = fourSqResponse.groups[0].items[3].venue.name;
// // var fourSquareVenueUrl3 = fourSqResponse.groups[0].items[3].venue.url;
// // var fourSquareVenueSpecialMessage3 = fourSqResponse.groups[0].items[3].venue.specials.items[0].message;
// // var fourSquareVenueLat3 = fourSqResponse.groups[0].items[3].venue.location.lat;
// // var fourSquareVenueLng3 = fourSqResponse.groups[0].items[3].venue.location.lng;


// // var fourSquareVenueName4 = fourSqResponse.groups[0].items[4].venue.name;
// // var fourSquareVenueUrl4 = fourSqResponse.groups[0].items[4].venue.url;
// // var fourSquareVenueSpecialMessage4 = fourSqResponse.groups[0].items[4].venue.specials.items[0].message;
// // var fourSquareVenueLat4 = fourSqResponse.groups[0].items[4].venue.location.lat;
// // var fourSquareVenueLng4 = fourSqResponse.groups[0].items[4].venue.location.lng;



// // The below code makes 2 sequential call outs (async) to the Uber service
// //service and forgets. We will deal with the response of these call outs in the
// //next step (jsAssembleUberCalloutsResponse.js)


// //var headers = {Authorization : 'Token ' +  'oQrP25aPXcalbZQqgDM6C-svEEFVUWSD-MGoI0ar'};

// var uberUrl0 = "https://api.uber.com/v1/estimates/price?start_latitude=37.338208&start_longitude=-121.886329"+"&end_latitude=" + fourSquareVenueLat0 + "&end_longitude=" + fourSquareVenueLng0;
// var uberUrl1 = "https://api.uber.com/v1/estimates/price?start_latitude=37.338208&start_longitude=-121.886329"+"&end_latitude=" + fourSquareVenueLat1 + "&end_longitude=" + fourSquareVenueLng1;




// // var uberUrl2 = "https://api.uber.com/v1/estimates/price?start_latitude=37.338208&start_longitude=-121.886329"+"&end_latitude=" + fourSquareVenueLat2 + "&end_longitude=" + fourSquareVenueLng2;
// // var uberUrl3 = "https://api.uber.com/v1/estimates/price?start_latitude=37.338208&start_longitude=-121.886329"+"&end_latitude=" + fourSquareVenueLat3 + "&end_longitude=" + fourSquareVenueLng3;
// // var uberUrl4 = "https://api.uber.com/v1/estimates/price?start_latitude=37.338208&start_longitude=-121.886329"+"&end_latitude=" + fourSquareVenueLat4 + "&end_longitude=" + fourSquareVenueLng4;





// // callout Uber for 1st call and forget
// var uberReq0 = new Request(uberUrl0,"GET",headers);
// context.setVariable("uberReq0",uberReq0);
// var uberCall0 = httpClient.send(uberReq0);
// context.session['uberCall0'] = uberCall0;


// // callout Uber for 1st call and forget
// var uberReq1 = new Request(uberUrl1,"GET",headers);
// var uberCall1 = httpClient.send(uberReq1);
// context.session['uberCall1'] = uberCall1;