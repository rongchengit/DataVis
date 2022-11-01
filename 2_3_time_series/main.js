 /* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
   height = window.innerHeight * 0.7,
   margin = {top:20, bottom:50, left:60, right:60};

/* LOAD csv then not autotyping but returning only variables i want, and adding +d changes string to number*/
d3.csv('office.csv', d =>{
  return{
    year: new Date(+d.year,0, 1),
    season: d.Season,
    votes: +d.Votes
  }
})
  .then((office) => { //creates the name for csv and pass back
    console.log("office", office) //test to see if it works
    console.log('date :>> ',office)//test to see if date works
  // SCALES
    
  const xScale = d3.scaleTime()
    .domain(d3.extent(office, d => d.year))
    .range([margin.left, width - margin.right])
    
    console.log(xScale.domain())

    const yScale = d3.scaleLinear()
    .domain(d3.extent(office, d => d.votes))
    .range([height - margin.bottom, margin.top])

    console.log(yScale.domain())

    const xAxis = d3.axisBottom(xScale);
    console.log(xAxis)

    const yAxis = d3.axisLeft(yScale);
    console.log(yAxis)

  // CREATE SVG ELEMENT
    const svg = d3.select("#container").append("svg")
    .attr("width",width)
    .attr("height",height)
    .style("background-color","pink")

  // BUILD AND CALL AXES
  const line = d3.line()
  .x(d => xScale(d.year))
  .y(d => yScale(d.votes)) 

  const groupData = d3.groups(office, d => d.season)
  console.log(groupData)

  const path = svg.selectAll("path")
    .data(groupData)
    .join("path")
    .attr("d", ([season, office]) => line(office))
    .attr("class",([season,office]) => season)
    .attr("stroke","black")
    .attr("fill","none")

    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);
  // LINE GENERATOR FUNCTION

  // DRAW LINE

});