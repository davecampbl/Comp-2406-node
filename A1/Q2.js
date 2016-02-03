var counter=0;
//this code simply tests the effects of local scopes
var ans2=[];//global variable
function f(x){
var ans=[];//local variable of f(x)
function add(x){
	ans[counter]=x;//accessing the local variable for f(x)
	ans2[counter]=x;//accessing the global variable
	counter++;
	return ans;
}
return add(x);
}

console.log(f(3));//log the example
console.log(ans2);//log the global variable