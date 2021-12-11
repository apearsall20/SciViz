width = 960,
height = 500;

async function first() {
  
  weather = await d3.csv("https://raw.githubusercontent.com/apearsall20/SciViz/master/data/weather.csv");
  maps_temp = await d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson");
  maps = maps_temp.features;

  console.log(weather[0]);
  console.log(maps[0]);
	var svg = d3.select("#Viz");

    svg.attr("width",width).attr("height",height);
// Map and projection
	var projection = d3.geoMercator()
    .center([-96, 38])                // GPS of location to zoom on
    .scale(770)                       // This is like the zoom
    .translate([ width/2, height/2 ])


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
}
document.addEventListener('DOMContentLoaded', () => {
  first();
});