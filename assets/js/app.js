// @TODO: YOUR CODE HERE!

var svgWidth = 700;
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
.attr("fill", "red")
.attr("opacity", ".5");

chartGroup.selectAll("null")
.data(data)
.enter()
.append("text")
.text(function(d) {return d.abbr})
.attr("x", d => xLinearScale(d.poverty))
.attr("y", d => yLinearScale(d.healthcare))
.attr("text-anchor", "middle")
.attr("font-size", 12)
.attr("fill", "white");

//Create Tool Tip

var toolTip = d3.tip()
  .attr("class", "tooltip")
  .offset([80, -60])
  .html(function(d) {
    return (`${d.state}<br> Poverty (%): ${d.poverty}`);
  });

//  Create tooltip in the chart

chartGroup.call(toolTip);

circlesGroup
      .on("click", function(data) {toolTip.show(data, this);})
      .on("mouseover", function(data) {toolTip.show(data, this);})
      .on("mouseout", function(data, index) {toolTip.hide(data);});

      chartGroup.append("text")
        .attr("transform", "rotate(-40)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Healthcare %");

      chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("Poverty");
    }).catch(function(error) {
      console.log(error);


  });
