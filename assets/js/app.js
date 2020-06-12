// @TODO: YOUR CODE HERE!

var svgWidth = 500;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);

var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);


d3.csv("assets/data/data.csv")
  .then(function(data) {
    console.log(data);
    data.forEach(function(d) {
      d.healthcare = +d.healthcare;
      d.poverty = +d.poverty;
      console.log(d.poverty);
      console.log(d.healthcare);
    });

var xLinearScale = d3.scaleLinear()
                    .domain([0, d3.max(data, d => d.poverty)])
                    .range([0, width]);

var yLinearScale = d3.scaleLinear()
                    .domain([0, d3.max(data, d => d.healthcare)])
                    .range([height, 0]);
//Create the axes

var bottomAxis = d3.axisBottom(xLinearScale);
var leftAxis = d3.axisLeft(yLinearScale);

chartGroup.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(bottomAxis);

chartGroup.append("g")
  .call(leftAxis);

//Create the Scatterplot

var circlesGroup = chartGroup.selectAll("circle")
.data(data)
.enter()
.append("circle")
.attr("cx", d => xLinearScale(d.poverty))
.attr("cy", d => yLinearScale(d.healthcare))
.attr("r", "15")
.attr("fill", "pink")
.attr("opacity", ".5");

var toolTip = d3.tip()
  .attr("class", "tooltip")
  .offset([80, -60])
  .html(function(d) {
    return (`<br>Health Care %: ${d.healthcare}<br>Poverty %: ${d.poverty}`);
  });

//  Create tooltip in the chart

chartGroup.call(toolTip);

circlesGroup
      .on("click", function(data) {toolTip.show(data, this);})
      .on("mouseover", function(data) {toolTip.show(data, this);})
      .on("mouseout", function(data, index) {toolTip.hide(data);});


  });
