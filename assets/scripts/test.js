
let arr = [3, 45, 67, 90, 22, 101];

function desc(item1, item2) {
	let item1Arr = item1.toString().split('');
	let item2Arr = item2.toString().split('');
	return compare(item1Arr, item2Arr);
}

function compare(arr1, arr2) {
	console.log(arr1, arr2);
	let length = arr1.length < arr2.length ? arr1.length : arr2.length;
	console.log(length);
	for (let x = 0; x < length; x++) {
		console.log(arr1[x], arr2[x]);
		if (arr1[x] > arr2[x]) {
			return -1;
		} else if (arr1[x] < arr2[x]) {
			return 1;
		} else {
			if (x == (length - 1)) {
				return 0;
			}
			continue;
		}
	}
}

arr.sort(desc);
console.log('arr=>', arr);
console.log(arr.join(''));