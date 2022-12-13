/* CONSTANTS AND GLOBALS */
const fontSize = 15; //makes sure the font is set with alignment
const delaytimer = 1000; //variable for delay timer
const rectProperties = {height: 20, padding: 10} //set the bars size
const svgMale = d3.select("#container1").append("svg") // turn my female container append svg .style with size
  .style("width", "45vw")
  .style("height", "45vw")
const containerMale = svgMale.append("g")
  .classed("container", true);

const svgFemale = d3.select("#container2").append("svg") //same for male container
  .style("width", "45vw")
  .style("height", "45vw")
const containerFemale = svgFemale.append("g")
  .classed("container", true);

//calling the update to reloop
repeat()

//creating async function to work with await for plot chart
async function plotChart(dateList, presentData, gender, svg, container){ //function that take in parameters

  for (const currentYear of dateList) {
    document.getElementById("labelyear").innerHTML = currentYear //update date to show year
    updateChart(svg, presentData.filter(baby=> baby.Year == currentYear && baby.Gender == gender), container)//restraints for graph
    await new Promise(done => setTimeout(() => done(), delaytimer)); //timer to stop
  } 
}

function repeat(){
  d3.csv('BabyNames.csv', d3.autoType) //loading data via csv
  .then((babyNames) => { //creates the name for csv and pass back
    const dateList = new Set(babyNames.map(baby=> baby.Year).sort()); //Timeline

    plotChart(dateList, babyNames, 'MALE', svgMale ,containerMale); //calling plotchart male
    plotChart(dateList, babyNames, 'FEMALE', svgFemale ,containerFemale); //calling plotchart femlae

  });
}
//function for loop
function updateChart(svg, presentData, container) { 
  const width = svg.node().clientWidth;

  //grab all the data and filter into to the current date and sex, then set present data to have unique names
  presentData = [...new Map(presentData.map((item) => [item["Name"], item])).values()];//unique name

  //scale for bars
  const widthScale = d3.scaleLinear()
                    .domain([0, d3.max(presentData, d => parseInt(d.Count))])
                    .range([0, width - fontSize - 75])
  
  
  presentData = presentData.sort((a,b) => b.Count - a.Count).slice(0, 10)//sort the array and limit array to 10 elements
  //rendering the name and count
  container
    .selectAll("text")
    .data(presentData)
    .enter()
    .append("text")
    
  container
    .selectAll("text")
    .text(d => d.Name + " "+ d.Count) //what it shows
    .transition()
    .delay(delaytimer)
    .attr("x", d => widthScale(d.Count) - 5) //sizing
    .attr("y", (d,i) => {
      return presentData.findIndex(e => e.Name === d.Name) * (rectProperties.height + rectProperties.padding) + fontSize //sizing
    })

    //rendering the svg rectangle 
  container
    .selectAll("rect")
    .data(presentData)
    .enter()
    .append("rect")
            
  container.selectAll("rect")
    .transition()
    .delay(delaytimer) 
    .attr("x", 5)
    .attr("y", (d,i) => {
      return presentData.findIndex(e => e.Name === d.Name) * (rectProperties.height + rectProperties.padding)
    })
    .attr("width", d => widthScale(parseInt(d.Count)) - 15)
    .attr("height", rectProperties.height)
}


