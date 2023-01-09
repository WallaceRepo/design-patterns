// proxy pattern: Object provides surrogate / placeholder
// for another object to control access to it.
// So interacting with object through proxy object instead of directly. 
// proxy means delegate, represantative, surrogate etc
// Usage: Interacting Remote resource, Virtual proxy controls access to resource that is expensive to create; cashing etc, Protection proxy is access management.

// Let's make an app that displays cryptocurrency rates. So we need to call several crypto API to get currency rate.
// External API Service
function CryptocurrencyAPI(){
    this.getValue = function(coin) {
        console.log(("CallingExternal API..."))
        switch(coin){
            case "Bitcoin":
                return "3$"
            case "Litecoin":
                return "50$"
            case "Etherium":
                return "6$"
        }
    }
}
const api = new CryptocurrencyAPI()
console.log(api.getValue("Bitcoin"))
console.log(api.getValue("Litecoin"))
console.log(api.getValue("Etherium"))
/* 
CallingExternal API...
3$
CallingExternal API...
50$
CallingExternal API...
6$
*/

/// 100s of this API request will slow down.
/// So we use proxy to use not to call API all the time
// Let's create proxy object that stores some of API data.
function CryptoProxyAPI(){
    this.api = new CryptocurrencyAPI()
    this.cache = {}
    this.getValue = function(coin){
        if(this.cache[coin] == null){
            this.cache[coin]= this.api.getValue(coin)
        }
    return this.cache[coin]
    }
}
const proxy = new CryptoProxyAPI();
console.log(proxy.getValue("Bitcoin"))
console.log(proxy.getValue("Litecoin"))
console.log(proxy.getValue("Bitcoin"))
console.log(proxy.getValue("Litecoin"))

// those API returned values are cashed on proxy object
// so they are returned without making API call.
// that way we can save network latency and make our program faster. 
/*
CallingExternal API...
3$
CallingExternal API...
50$
3$
50$
*/
/* The GeoCoder object simulates the Google Maps Geocoding service. In geocoding you provide a location (a place on the earth) and 
it will return its latitude/longitude (latlng). Our GeoCoder can resolve only 4 locations, but in reality there are millions, 
because it involves countries, cities, and streets. 
The programmer decided to implement a Proxy object because GeoCoder is relatively slow. The proxy object is called GeoProxy. 
It is known that many repeated requests (for the same location) are coming in. To speed things up GeoProxy caches frequently requested locations.
If a location is not already cached it goes out to the real GeoCoder service and stores the results in cache.
Several city locations are queried and many of these are for the same city. GeoProxy builds up its cache while supporting these calls. 
At the end GeoProxy< has processed 11 requests but had to go out to GeoCoder only 3 times. 
Notice that the client program has no knowledge about the proxy object (it calls the same interface with the standard getLatLng method).
*/
function GeoCoder() {
    
  this.getLatLng = function(address) {
      console.log("API call: " + address)
    switch (address) {
      case "Amsterdam": 
            return "52.3700° N, 4.8900° E"
      case "London": 
            return "51.5171° N, 0.1062° W";         
      case "Paris": 
            return "48.8742° N, 2.3470° E";  
    case "Berlin":
          return "52.5233° N, 13.4127° E"; 
    default: return ""; 
   }
  }
}
function GeoProxy() {
    let geocoder = new GeoCoder()
    let cache = {}
    
    return {
        getLatLng: function(address) {
            if( !cache[address]) {
                cache[address] = geocoder.getLatLng(address)
            }
        console.log(address + ":" + cache[address])
            return cache[address]
        },
        getCount: function(){
            var count = 0;
            for (var code in cache) count++
            return count;
        }
    }
 }
const geo = new GeoProxy();
    geo.getLatLng("Paris")
    geo.getLatLng("London");
    geo.getLatLng("London");
    geo.getLatLng("London");
    geo.getLatLng("London");
    geo.getLatLng("Amsterdam");
    geo.getLatLng("Amsterdam");
    geo.getLatLng("Amsterdam");
    geo.getLatLng("Amsterdam");
    geo.getLatLng("London");
    geo.getLatLng("London");
    
    console.log("\nCache size: " + geo.getCount());

/*
API call: Paris
Paris:48.8742° N, 2.3470° E
API call: London
London:51.5171° N, 0.1062° W
London:51.5171° N, 0.1062° W
London:51.5171° N, 0.1062° W
London:51.5171° N, 0.1062° W
API call: Amsterdam
Amsterdam:52.3700° N, 4.8900° E
Amsterdam:52.3700° N, 4.8900° E
Amsterdam:52.3700° N, 4.8900° E
Amsterdam:52.3700° N, 4.8900° E
London:51.5171° N, 0.1062° W
London:51.5171° N, 0.1062° W

Cache size: 3
*/
