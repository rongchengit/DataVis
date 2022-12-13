
const svgBar = d3.select("#container3")
    .append("svg")
    .attr("width", width2 + margin.left + margin.right)
    .attr("height", height2 + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

d3.csv('BabyNames.csv', d3.autoType) //load babyNames into csv 
  .then((babyNames) => {

    const groups = babyNames.map(d => (d.Name))

  });