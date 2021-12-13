width = 960,
height = 500;

async function first() {
  
  weather = await d3.csv("https://raw.githubusercontent.com/apearsall20/SciViz/master/data/grid.csv");
  maps_temp = await d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson");
  maps = maps_temp.features;

  temperature = [];
  for (thing in weather){
    row = {}
    row.x = weather[thing].longitude
    row.y = weather[thing].latitude
    row.value = weather[thing].temperature
    temperature.push(row)
  };

	var svg = d3.select("#Viz");

    svg.attr("width",width).attr("height",height);
// Map and projection
	var projection = d3.geoMercator()
    .center([-96, 38])                // GPS of location to zoom on
    .scale(770)                       // This is like the zoom
    .translate([ width/2, height/2 ])

  thresholds = d3.range(1, 20).map(i => -40+3.25*i)  
  console.log(thresholds);
    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(maps)
        .enter()
        .append("path")
          .attr("fill", "green")
          .attr("d", d3.geoPath()
              .projection(projection)
          )
       .style("stroke", "black");

  contours = d3.contourDensity()
    .x(function(d) {return d.x })
    .y(function(d) {return d.y })
    .size([width,height])
    .thresholds(thresholds)
  (temperature);

    console.log(contours)


    svg.append("g")
        .selectAll("circle")
        .data(weather)
        .enter()
        .append("circle")
          .attr("cx", function(d){ return projection([d.lon2, d.lat2])[0] })
          .attr("cy", function(d){ return projection([d.lon2, d.lat2])[1] })
          .attr("r", 1.1)
          .attr("fill","black")

    svg.append("g")
        .selectAll("line")
        .data(weather)
        .enter()
        .append("line")
        .attr("x1", function(d){ return projection([d.longitude,d.latitude])[0] })
        .attr("y1", function(d){ return projection([d.longitude,d.latitude])[1] })
        .attr("x2", function(d){ return projection([d.lon2, d.lat2])[0] })
        .attr("y2", function(d){ return projection([d.lon2, d.lat2])[1] })
        .style("stroke","black")

    svg.append("g")
      .selectAll("path")
      .data(contours)
      .enter()
      .append("path")
        .attr("d", d3.geoPath())
        .attr("fill","none")
        .attr("stroke","pink")

}

document.addEventListener('DOMContentLoaded', () => {
  first();
});