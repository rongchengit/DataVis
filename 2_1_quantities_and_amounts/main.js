
/* CONSTANTS AND GLOBALS */
const height = window.innerHeight * 0.7,
width = 500;

/* LOAD DATA */
//opted to forgo autotype incase bodyweight was placed as string
d3.csv('pweight.csv',d =>{
  return{
    name: d.name,
    bodyweight: +d.bodyweight
  }
}) //load data into csv 
  .then((pokeW) => { //creates the name for csv and pass back
    console.log("pokeW", pokeW) //test to see if it works

    /* SCALES */
    /** This is where you should define your scales from data to pixel space **/

    const xScale = d3.scaleLinear()
    .domain([0, d3.max(pokeW, d => d.bodyweight)])//min of 0 and max of the max number of bodyweight
    .range([0,width]) 
    console.log(xScale.domain())

    const yScale = d3.scaleBand()
    .domain(pokeW.map(d => d.name)) //names for y axis in all 900 pokemon
    .range([height, 0])
    .padding(0.1);
    console.log(yScale.domain())

    const xAxis = d3.axisBottom(xScale);
    console.log(xAxis)

    const yAxis = d3.axisLeft(yScale);
    console.log(yAxis)

    const svg = d3.select("#container").append("svg") // turns my #container into d3 and adds svg
    .attr("width", width)
    .attr("height", height)
    .style("background-color","pink")
    console.log(svg)

    /* HTML ELEMENTS */
    /** Select your container and append the visual elements to it */
    svg.selectAll("rect.bar")
    .data(pokeW)
    .join("rect")
    .attr("class","bar")
    .attr("x",d => xScale(d.bodyweight))
    .attr("y",d => yScale(d.name))
    .attr("width",d => width - xScale(d.bodyweight))
    .attr("height", yScale.bandwidth())
  
    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);
    
  });