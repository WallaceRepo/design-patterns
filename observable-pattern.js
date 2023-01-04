 // My creation for the Observer pattern 
function Pub(){
    this.temp = 0;
    this.observers = [];
}
Pub.prototype = {
    subscribe: function(obs) {
        this.observers.push(obs)
    },
    unSubscribe: function(deleteObs) {
        this.observers = this.observers.filter( ob => ob !== deleteObs)
    },
    notify: function() {
        this.observers.forEach( ob => ob.update(this.temp))
    },
    changeTemp: function(temp) {
        this.temp = temp;
        this.notify()
    }
}
function Observer(name) {
    this.temp = 0
    this.name = name
}
Observer.prototype.update = function(temp) {
    this.temp = temp
    this.display();
}
Observer.prototype.display = function() {
    console.log(this.name + " Today weather is " + this.temp)
}

const mypub = new Pub()
const obs1 = new Observer('Obs1')
const obs2 = new Observer('Obs2')
const obs3 = new Observer('Obs3')

 mypub.subscribe(obs1);
 mypub.subscribe(obs2);
 mypub.subscribe(obs3);
 mypub.changeTemp("98F");
 mypub.unSubscribe(obs1)
 
 /*
 Obs1 Today weather is 98F
Obs2 Today weather is 98F
Obs3 Today weather is 98F
{
  temp: '98F',
  observers: [
    Observer { temp: '98F', name: 'Obs2' },
    Observer { temp: '98F', name: 'Obs3' }
  ]
}

*/

// YOutube example, which was just a half of fucntionality

function Pub(){
    this.temp = 0;
    this.observers = [];
}
Pub.prototype = {
    subscribe: function(fn) {
        this.observers.push(fn)
    },
    unSubscribe: function(deletefn) {
        this.observers = this.observers.filter( ob => ob !== deletefn)
    },
    notify: function() {
        this.observers.forEach( ob => ob.call())
    },
    changeTemp: function(temp) {
        this.temp = temp;
        this.notify()
    }
}
function Obs1() {
  console.log('Obs1 logged')
}
function Obs2() {
    console.log("Obs2 logged")
}

const mypub = new Pub()
 mypub.subscribe(Obs1);
 mypub.subscribe(Obs2);
 
 mypub.changeTemp("98F");
 mypub.unSubscribe(Obs1)
 
 console.log(mypub)
/*
Obs1 logged
Obs2 logged
{ temp: '98F', observers: [ [Function: Obs2] ] }
*/

