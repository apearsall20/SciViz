width = 960,
height = 500;

async function first() {
  
  weather = await d3.csv("https://raw.githubusercontent.com/apearsall20/SciViz/master/data/weather.csv");
  maps_temp = await d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson");
  maps = maps_temp.features;

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

    console.log(Number(weather[0].longitude), 
      Number(weather[0].u),
      Number(weather[0].longitude) + Number(weather[0].u),
      Number(weather[0].latitude),
      Number(weather[0].v),
      Number(weather[0].latitude) + Number(weather[0].v),
      projection([Number(weather[0].longitude) + Number(weather[0].u),
        Number(weather[0].latitude) + Number(weather[0].v)])
      )


    svg.append("g")
        .selectAll("circle")
        .data(weather)
        .enter()
        .append("circle")
          .attr("cx", function(d){ return projection([d.longitude, d.latitude])[0] })
          .attr("cy", function(d){ return projection([d.longitude, d.latitude])[1] })
          .attr("r", 1)

    console.log(projection((weather[0].longitude,weather[0].latitude)))
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

/*        .attr("x1", function(d){ return (d.longitude)})
        .attr("y1", function(d){ return (d.latitude)})
        .attr("x2", function(d){return (d.longitude) + d.u})
        .attr("y2", function(d){return (d.latitude) + d.v})
        .attr("d",d3.geoPath()
          .projection(projection))
*/
}

document.addEventListener('DOMContentLoaded', () => {
  first();
});