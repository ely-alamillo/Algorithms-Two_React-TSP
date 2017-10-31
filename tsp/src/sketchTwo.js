export default function sketck(p) {
  console.log(p);
  var cities = [];
  var totalCities = 5;
  var order = [];
  var totalPermutations;
  var count = 0;
  var recordDistance;
  var bestEver;

  p.setup = function() {
    p.createCanvas(400, 600);
    for (var i = 0; i < totalCities; i++) {
      var v = p.createVector(p.random(p.width), p.random(p.height / 2 - 50));
      cities[i] = v;
      order[i] = i;
    }
    var d = p.calcDistance(cities, order);
    recordDistance = d;
    bestEver = order.slice();

    totalPermutations = p.factorial(totalCities);
    console.log(totalPermutations);
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    console.log('inside of setCities, props: ', props.numberCities);
    console.log(typeof props.numberCities);
    if (props.numberCities) {
      totalCities = parseInt(props.numberCities, 10)
    }
    console.log(typeof totalCities);
  }

  p.draw = function() {
    p.background(0);
    // frameRate(5);
    p.fill(255);

    // draws the cities
    for (var i = 0; i < cities.length; i++) {
      p.ellipse(cities[i].x, cities[i].y, 18, 18);
    }

    // connects the cities
    p.stroke(255, 0, 255);
    p.strokeWeight(4);
    p.noFill();
    p.beginShape();
    for (var i = 0; i < order.length; i++) {
      var n = bestEver[i];
      p.vertex(cities[n].x, cities[n].y);
    }
    p.endShape();

    // moves the cities down to show paths
    p.translate(0, p.height / 2);
    p.stroke(255);
    p.strokeWeight(4);
    p.noFill();
    p.beginShape();

    // draws cities
    for (var i = 0; i < cities.length; i++) {
      p.ellipse(cities[i].x, cities[i].y, 18, 18);
    }
    // draws the lines to connect lower cities
    for (var i = 0; i < order.length; i++) {
      var n = order[i];
      p.vertex(cities[n].x, cities[n].y);
    }
    p.endShape();

    var d = p.calcDistance(cities, order);
    if (d < recordDistance) {
      recordDistance = d;
      bestEver = order.slice();
    }

    p.textSize(32);
    // var s = '';
    // for (var i = 0; i < order.length; i++) {
    //   s += order[i];
    // }
    p.fill(255);
    var percent = 100 * (count / totalPermutations);
    if (percent < 99) {
      p.text(p.nf(percent, 0, 2) + "% completed", 20, p.height / 2 - 10);
    }

    p.nextOrder();
  };

  p.swap = function(a, i, j) {
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  };

  p.calcDistance = function(points, order) {
    var sum = 0;
    for (var i = 0; i < order.length - 1; i++) {
      var cityAIndex = order[i];
      var cityA = points[cityAIndex];
      var cityBIndex = order[i + 1];
      var cityB = points[cityBIndex];
      var d = p.dist(cityA.x, cityA.y, cityB.x, cityB.y);
      sum += d;
    }
    return sum;
  };

  p.nextOrder = function() {
    count++;

    // STEP 1 of the algorithm
    // https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering
    var largestI = -1;
    for (var i = 0; i < order.length - 1; i++) {
      if (order[i] < order[i + 1]) {
        largestI = i;
      }
    }
    if (largestI === -1) {
      p.noLoop();
      console.log("finished");
      p.text("completed", 20, p.height / 2 - 10);
    }

    // STEP 2
    var largestJ = -1;
    for (var j = 0; j < order.length; j++) {
      if (order[largestI] < order[j]) {
        largestJ = j;
      }
    }

    // STEP 3
    p.swap(order, largestI, largestJ);

    // STEP 4: reverse from largestI + 1 to the end
    var endArray = order.splice(largestI + 1);
    endArray.reverse();
    order = order.concat(endArray);
  };

  p.factorial = function(n) {
    if (n === 1) {
      return 1;
    } else {
      return n * p.factorial(n - 1);
    }
  };
}
