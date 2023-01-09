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
