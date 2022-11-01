/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * .7,
height = window.innerHeight * .7,
margin ={top: 20, bottom: 60, left: 60, right:40},
radius = 5;

/* LOAD DATA */
d3.csv('pweight.csv', d3.autoType) //load data into csv 
  .then((pokeW) => { //creates the name for csv and pass back
    console.log("pokeW", pokeW) //test to see if it works
    
    /* SCALES */
    //x scale
    const xScale = d3.scaleLinear()
    .domain([0,10000]) //range of weight, heaviest is 9999
    .range([margin.left, width - margin.right]) //left to width - 40 so n - 40
    console.log(xScale.domain())

    //y scale
    const yScale = d3.scaleLinear()
    .domain([0,1000])//range of height tallest is 1000
    .range([height - margin.bottom, margin.top]) // height - 60 bottom to top
    console.log(yScale.domain())

    const xAxis = d3.axisBottom(xScale);
    console.log(xAxis)

    const yAxis = d3.axisLeft(yScale);
    console.log(yAxis)

    //color of scales
    const colorScale = d3.scaleOrdinal()
    .domain(["R","D"])
    .range(["red","blue"])

    //svg
    const svg = d3.select("#container").append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color","pink")
    
    //circle
    //this method allows transition
   const circles = svg.selectAll(".dot")
   .data(pokeW)
   .join(
      enter => enter
      .append("circle")
      .attr("r",0) //starts at 0
      .call(sel => sel.transition()
      .duration(10) //mili seconds
      .delay(d => d.bweight * 20)// delaying when it shows
      .attr("r",5)),//size
      update => update,
      exit => exit,
   )
   .attr("class","dot")
   .attr("cx", d=> xScale(d.bweight))
   .attr("cy", d=> yScale(d.bheight))
   .attr("fill", d=> colorScale(d.name))

   //old method works. Shows both

    // const circles = svg.selectAll(".dot")
    //   .data(pokeW)
    //   .join("circle")
    //   .attr("class","dot")
    //   .attr("cx", d=> xScale(d.bweight))
    //   .attr("cy", d=> yScale(d.bheight))
    //   .attr("r", 5)
    //   .attr("fill", d=> colorScale(d.name))

    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);

    // /* HTML ELEMENTS */

    
  });