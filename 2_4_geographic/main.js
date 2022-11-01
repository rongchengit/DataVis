/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.9,
height = window.innerHeight * 0.7,
margin = { top: 20, bottom: 50, left: 60, right: 40 };

/**
 * LOAD DATA
 * Using a Promise.all([]), we can load more than one dataset at a time
 * */
 Promise.all([
  d3.json("../data/usState.json"),
  d3.csv("../data/stateCapitals.csv", d3.autoType),
]).then(([geojson, capitals]) => {
  
  console.log("geojson", geojson)
  console.log("capital", capitals)

  // SPECIFY PROJECTION
  const svg = d3.select("#container").append("svg")
  .attr("width", width)
  .attr("height", height)

  const projection = d3.geoAlbersUsa()
  .fitSize([width, height], geojson)

  const pathGen = d3.geoPath(projection)

  //appending order goes from first to last with last being on top like a cake i.e states then capital on top

  const states = svg.selectAll("path.states")
  .data(geojson.features)
  .join("path")
  .attr("class","states")
  .attr("d", coords => pathGen(coords))
  .attr("fill","transparent")
  .attr("stroke","pink")
 
  const capital = svg.selectAll("circle.capital")
  .data(capitals)
  .join("circle")
  .attr("class","capital")
  .attr("d", coords => pathGen(coords))
  .attr("r",2.5)
  .attr("fill","purple")
  .attr("transform",(d) =>{ 
    const coords = projection([d.longitude, d.latitude])
    console.log(coords)//show the location of coords if its there
    // coords have 2 array and 0 and 1 represents x and y
    return `translate(${coords[0]}, ${coords[1]})` 
  })
  // .attr("transform", d => `translate(${width/2}, ${height/2})`) //transform messes with the css

});