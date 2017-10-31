export default function sketch(p) {
  const cities = [];
  const totalCities = 5;
  let recordDistance;
  let bestEver;

  p.setup = function() {
    p.createCanvas(400,400);
    for (let i = 0; i < totalCities; i++) {
      const v = p.createVector(p.random(p.width), p.random(p.height))
      cities[i] = v;
    }
    let d = p.calcDistance(cities)
    recordDistance = d;
    bestEver = cities.slice()
  }

  p.draw = function () {
    p.background(0);
    p.fill(255);
    for (let i = 0; i < cities.length; i++) {
      p.ellipse(cities[i].x, cities[i].y, 10, 10)
    }

    p.stroke(255)
    p.strokeWeight(2)
    p.noFill()
    p.beginShape()
    for (let i = 0; i < cities.length; i++) {
      p.vertex(cities[i].x, cities[i].y)
    }
    p.endShape();

    p.stroke(255, 0, 255)
    p.strokeWeight(4)
    p.noFill()
    p.beginShape()
    for (let i = 0; i < cities.length; i++) {
      p.vertex(bestEver[i].x, bestEver[i].y)
    }
    p.endShape();

    let i = p.floor(p.random(cities.length))
    let j = p.floor(p.random(cities.length))
    p.swap(cities, i, j)

    let d = p.calcDistance(cities)
    if ( d < recordDistance) {
      recordDistance = d;
      bestEver = cities.slice();
      console.log('record distance: ', recordDistance);
    }
  }

  p.swap = function (array, i, j) {
    let tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }

  p.calcDistance = function (points) {
    let sum = 0;
    // - 1 to not reach the last element
    for (let i = 0; i < points.length - 1; i++) {
      var d = p.dist(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y)
      sum += d
    }
    return sum;
  }
}
