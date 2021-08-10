//variables
var _2PI = 2*Math.PI;


//layout conf.
var svgWidth = 350,
    svgHeight = 350,
    margin = {top: 10, right: 10, bottom: 10, left: 10},
    height = svgHeight - margin.top - margin.bottom,
    width = svgWidth - margin.left - margin.right,
    halfWidth = width/2,
    halfHeight = height/2,
    treemapRadius = 155,
    treemapCenter = [halfWidth, halfHeight+5];
      


    
//treemap conf.
var _voronoiTreemap = d3.voronoiTreemap();
var hierarchy, circlingPolygon;


      
//drawing conf.
var fontScale = d3.scaleLinear();
      
//reusable d3Selection
var svg, drawingArea, treemapContainer;
     
//init treemap
d3.json("geostats.json").then(function(rootData) {
    initData();
    initLayout(rootData);
    hierarchy = d3.hierarchy(rootData).sum(function(d){ return d.weight; });
    _voronoiTreemap
    .clip(circlingPolygon)
    (hierarchy);

    drawTreemap(hierarchy);
});

function initData(rootData) {
    circlingPolygon = computeCirclingPolygon(treemapRadius);
    fontScale.domain([3, 20]).range([8, 20]).clamp(true);
}

function computeCirclingPolygon(radius) {
    var points = 60,
        increment = _2PI/points,
        circlingPolygon = [];

    for (var a=0, i=0; i<points; i++, a+=increment) {
        circlingPolygon.push(
        [radius + radius*Math.cos(a), radius + radius*Math.sin(a)]
        )
    }

    return circlingPolygon;
};

function initLayout(rootData) {
    svg = d3.select("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

    drawingArea = svg.append("g")
    .classed("drawingArea", true)
    .attr("transform", "translate("+[margin.left,margin.top]+")");

    treemapContainer = drawingArea.append("g")
    .classed("treemap-container", true)
    .attr("transform", "translate("+treemapCenter+")");

    treemapContainer.append("path")
    .classed("world", true)
    .attr("transform", "translate("+[-treemapRadius,-treemapRadius]+")")
    .attr("d", "M"+circlingPolygon.join(",")+"Z");
}

var colorArray = ["#6b6d76", "#b1a7a6", "#d3d3d3", "#f5f3f4",
"#ffffff", "#e5383b", "#ba181b", "#a4161a", "#660708" ];
var changeArray = [-24, -12, -6, -2, 0, 2, 6, 12, 24];

function drawTreemap(hierarchy) {
    var leaves=hierarchy.leaves();

    var cells = treemapContainer.append("g")
        .classed('cells', true)
        .attr("transform", "translate("+[-treemapRadius,-treemapRadius]+")")
        .selectAll(".cell")
        .data(leaves)
        .enter()
        .append("path")
        .classed("cell", true)
        .attr("d", function(d){ return "M"+d.polygon.join(",")+"z"; })
        .style("fill", function(d) {
            if (d.data.pricechange < changeArray[0]) {
                console.log(d.data.pricechange)
              return colorArray[0];
            } else if (d.data.pricechange > changeArray[0] && d.data.pricechange < changeArray[1]) {
              return colorArray[1];
            } else if (d.data.pricechange > changeArray[1] && d.data.pricechange < changeArray[2]) {
              return colorArray[2];
            } else if (d.data.pricechange > changeArray[2] && d.data.pricechange < changeArray[3]) {
              return colorArray[3];
            } else if (d.data.pricechange > changeArray[3] && d.data.pricechange < changeArray[4]) {
              return colorArray[4];
            } else if (d.data.pricechange > changeArray[4] && d.data.pricechange < changeArray[5]) {
              return colorArray[5];
            } else if (d.data.pricechange > changeArray[5] && d.data.pricechange < changeArray[6]) {
              return colorArray[6];
            } else if (d.data.pricechange > changeArray[6] && d.data.pricechange < changeArray[7]) {
              return colorArray[7];
            } else if (d.data.pricechange > changeArray[7] && d.data.pricechange < changeArray[8]) {
              return colorArray[8];
            } else if (d.data.pricechange > changeArray[8]) {
              return colorArray[9];
            } else if (d.data.pricechange == changeArray[8]) {
              return colorArray[7];
            } else if (d.data.pricechange == changeArray[4]) {
              return colorArray[5];
            } else if (d.data.pricechange == changeArray[3]) {
              return colorArray[4];
            } else if (d.data.pricechange == changeArray[6]) {
              return colorArray[6];
            } else if (d.data.pricechange == 2) {
              return colorArray[5];
            }
          });

    var labels = treemapContainer.append("g")
        .classed('labels', true)
        .attr("transform", "translate("+[-treemapRadius,-treemapRadius]+")")
        .selectAll(".label")
        .data(leaves)
        .enter()
        .append("g")
        .classed("label", true)
        .attr("transform", function(d){
            return "translate("+[d.polygon.site.x, d.polygon.site.y]+")";
        })
        .style("font-size", function(d){ return fontScale(d.data.weight); });


    var hoverers = treemapContainer.append("g")
        .classed('hoverers', true)
        .attr("transform", "translate("+[-treemapRadius,-treemapRadius]+")")
        .selectAll(".hoverer")
        .data(leaves)
        .enter()
        .append("path")
        .classed("hoverer", true)
        .attr("d", function(d){ return "M"+d.polygon.join(",")+"z"; });

    hoverers.append("title")
    .text(function(d) { return d.data.name + "\n" + d.value+"%" + "\n" + d.data.pricechange; })
    .classed("hoverer-label", true);
    
}


const heading = document.getElementById('heading')
const eng = document.getElementById('eng')
const geo = document.getElementById('geo')
const geoHeading = document.getElementById('geoHeading')
const engSection = document.getElementById('engSection')
const geoSection = document.getElementById('geoSection')
const engSection1 = document.getElementById('engSection1')
const geoSection1 = document.getElementById('geoSection1')
const engFooter = document.getElementById('engFooter')
const geoFooter = document.getElementById('geoFooter')


languageSwitch = (elem, target, removed) => {
  elem.addEventListener("click", function() {
    target.classList.remove('hidden')
    removed.classList.add('hidden')
  })
}

languageSwitch(eng, heading, geoHeading)
languageSwitch(eng, engSection, geoSection)
languageSwitch(eng, engSection1, geoSection1)
languageSwitch(eng, engFooter, geoFooter)
languageSwitch(geo,geoHeading, heading)
languageSwitch(geo, geoSection,engSection)
languageSwitch(geo, geoSection1,engSection1)
languageSwitch(geo, geoFooter, engFooter)



