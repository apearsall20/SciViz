document.addEventListener('DOMContentLoaded', () => {
  
  var weather = d3.csv("data/weather.csv", function(data){

  console.log(data)
});

	var svg = d3.select("#Viz"),
    width = 960,
    height = 500;
    svg.attr("width",width).attr("height",height)
// Map and projection
	var projection = d3.geoMercator()
    .center([-96, 38])                // GPS of location to zoom on
    .scale(770)                       // This is like the zoom
    .translate([ width/2, height/2 ])

// Load external data and boot
    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson", function(data){

    // Filter data
//    data.features = data.features.filter(function(d){; return d.properties.name=="USA"})

    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
          .attr("fill", "grey")
          .attr("d", d3.geoPath()
              .projection(projection)
          )
       .style("stroke", "black")
;
	})

})