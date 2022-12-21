
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

    //Sorting before slice will give me the fattest or skinnest pokemon and sorting after slice will give me fattest only for after slice
    //place before all places i would use pokeW so in the beginning
    //double sorting to get heaviest then slice then resort back into lightest so the second sort is the inversion
    pokeW = pokeW.sort((a,b) => b.bodyweight - a.bodyweight).slice(0,25).sort((a,b) => a.bodyweight - b.bodyweight)
    heaviestPokemon = d3.max(pokeW, d => d.bodyweight)
    console.log("heaviestPokemon: ",heaviestPokemon)
    /* SCALES */
    /** This is where you should define your scales from data to pixel space **/
    const xScale = d3.scaleLinear()
    .domain([0, Math.pow(10, Math.ceil(Math.log10(heaviestPokemon)))]) //scaling potentially *10 for max size
    .range([0,width]) //sizing for the left size of the svg box
    console.log(xScale.domain())

    const yScale = d3.scaleBand()
    .domain(pokeW.map(d => d.name)) //names for y axis in all 900 pokemon
    .range([20,height])//moves the scale down 10
    .padding(0.5); // space between the bars
    console.log(yScale.domain())

    const xAxis = d3.axisTop(xScale); //shows where the weight scale will locate
    console.log(xAxis)

    const yAxis = d3.axisRight(yScale); //shows where the names will be located
    console.log(yAxis)

    //this is for the rendering box sizing
    const svg = d3.select("#container").append("svg") // turns my #container into d3 and adds svg
    .attr("width", width + 100) //sizing for the box width on the right size
    .attr("height", height)
    console.log(svg)

    /* HTML ELEMENTS */
    /** Select your container and append the visual elements to it */

    svg.selectAll("rect.bar")
    .data(pokeW)
    .join("rect")
    .attr("class","bar")
    .attr("x",3)//moved the bar 3px
    .attr("y",d => yScale(d.name))
    .attr("width",d => xScale(d.bodyweight))
    .attr("height", yScale.bandwidth())
    .style("fill","pink")
    
    svg.append("g").style("transform","translate(3px, 20px)").classed("axis",true).call(xAxis);//move the y scale down 20px and move left 3px
    svg.append("g").style("transform","translateX(3px)").call(yAxis);//moved it right 3px
  
    
  });