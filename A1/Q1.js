function quicksort(array){
	if(array.length<=0) return [];
	var less=[];
	var greater=[];
	var equal=[]
	var pivot=array[0];

	for(var i=0;i<array.length;i++){
		if(pivot>array[i])
			less.push(array[i]);
		if(pivot==array[i])
			equal.push(array[i]);
		if(pivot<array[i])
			greater.push(array[i]);
	}

return quicksort(less).concat(equal,quicksort(greater));

}

var lis= new Array(7,1,2,5);


console.log(quicksort(lis));