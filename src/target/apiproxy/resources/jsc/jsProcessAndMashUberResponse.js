var mashedArray = JSON.parse(context.getVariable("mashedArray"));
totalUberUrls = context.getVariable("totalUberUrls");

for(var i=0;i<totalUberUrls;i++)
{
	var uberResponse = JSON.parse(context.getVariable('uberCall'+i));
	mashedArray[i].distance=uberResponse.prices[0].distance;
	mashedArray[i].duration=Math.round(uberResponse.prices[0].duration/60);
	mashedArray[i].fareEstimate=uberResponse.prices[0].estimate;
}

context.setVariable("mashedArray",JSON.stringify(mashedArray));