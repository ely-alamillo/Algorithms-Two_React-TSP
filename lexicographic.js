const vals = [0, 1, 2];
const totalCities = 5;
let recordDistance;
let bestEver;

function setup() {
  createCanvas(400,400);

}

function draw() {
  console.log(vals);
  background(0);
  fill(255);

  // step one of the algo
  let largestI = -1;
  for (var i = 0; i < vals.length - 1; i++) {
    if (vals[i] < vals[i + 1]) {
      largestI = i;
    }
  }
  if (largestI === -1) {
    noLoop()
    console.log('finished');
  }

  // step 2
  var largestJ = -1
  for (var j = 0; j < vals.length; i++) {
    if (vals[j] < vals[largestI]) {
      largestJ = j;
    }
  }

  // step 3
  swap(largestI, largestJ);

  // step 4 revere from largestI + 1 to the end
  var endArray = vals.splice(largestI + 1)
  endArray.reverse();
  vals = vals.concat(endArray)
}


function swap(array, i, j) {
  let tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}
