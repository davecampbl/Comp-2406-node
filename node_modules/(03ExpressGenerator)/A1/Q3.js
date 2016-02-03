function make(){
	var counter=0;
	return function(x){//returns a function which will state whether or not x does something meaningful
		if(counter==0)
		console.log(x.toString()+ " does something Meaningful");
		else
		console.log(x.toString()+ " does not do something meaningful");
	counter++;
	}
}
(make())(10);
(make())(4);

