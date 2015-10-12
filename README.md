# AskAnApigeek

Mash up's in Apigee

The "AskAnApigeek" app is powered by the foursquare and uber api's.
In Apigee proxy the responses from both are mashed and presented to the app.
You can either register to each foursquare and uber and create your own accounts and developer apps, or you can use the test api keys and secret.

Foursquare venue explore api request sample -

curl -X GET 'https://api.foursquare.com/v2/venues/explore?client_id=STPMU22BKKOB2OR1CJTDQSDKRGYRUT2M5VZHVD3PQCGZ1ZXU&client_secret=FF2U5SPEZLLYLHCQWVMSM5P4TS03V3H4GQIR0KHTSMBZFKKW&v=20130815&near=San Jose&query=pizza&specials=1'

We grab the top 5 or top 1 responses from the foursquare API and use the lat and lng of those and use that to make calls to the Uber API's.

Uber estimates api request sample -

curl -X GET -H "Authorization: Token oQrP25aPXcalbZQqgDM6C-svEEFVUWSD-MGoI0ar" 'https://api.uber.com/v1/estimates/price?start_latitude=37.338208&start_longitude=-121.886329&end_latitude=37.337587411887888&end_longitude=-121.9328866498584'


ASK AN APIGEEK Request Samples

TOP 1 of something

curl -X POST -H "Content-Type: application/json" -d '{

    "cat":"spa",
    "near":"San Jose"
}' 'http://askanapigeek-test.apigee.net/v1/askanapigeek?select=top1'

TOP 5 of something


curl -X POST -H "Content-Type: application/json" -d '{

    "cat":"burger",
    "near":"San Jose"
}' 'http://askanapigeek-test.apigee.net/v1/askanapigeek?select=top5'


NOTE - The current location details are HARDCODED to the San Jose Convention Center's lat and lng.(DEMO purpose)
 This can definitely MUST configured externally in a better way as a best practice.
 
 
 Link for the AskAnApigeek App - http://apigee-certify-09-prod.apigee.net/v2/demoapp/index.html?#

