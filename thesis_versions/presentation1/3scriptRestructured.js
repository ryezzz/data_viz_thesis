var width = window.innerWidth/1.77;
var height = window.innerHeight/3.6;
var margin = {top: 0, right: 10, bottom: 0, left: 20}
var sliderFreeInput = document.getElementById("timeSlider");


//Creates looping through year interactivity for both the slider and play function
function loopThrough(year){
    var year = year
    d3.select('#mapTitleDate')
        .text(year)
  
        d3.selectAll(".label")

            d3.selectAll(".label")
                .style( "visibility", function(){
                        if (this.id.includes(year)){
                            return "visible"
                        } else {return "hidden"}
                         })
                         
                .style('fill', 'white')
            

            d3.selectAll('.mapImg')
                // .transition()
                .style('opacity', function(){
                    if(this.id.includes(year)){
                        return "1"
                    }
                    
            d3.selectAll('g.tick')
                  .select('line') //grab the tick line
                  .attr('class', 'not') //style with a custom class and CSS
                  .style('stroke', 'white')
                  .style('stroke-width', .2); 
            
            d3.selectAll('g.tick')
                 .filter(function(d){ 
                  var val = parseTime2(year).toString();
                  return d==val;} )
                  .select('line') //grab the tick line
                  .attr('class', 'highlighted') //style with a custom class and CSS
                    .style('stroke', '#6dc925')
                  .style('stroke-width', 1); 
                })
                

}


function renderMap(data){
    var imagesContainer =  d3.selectAll('.imagesContainer');
    var images = imagesContainer.selectAll('img')
      .data(data)
      .enter()
      .append('img')
      .attr('class', 'mapImg')
      .attr('id', function(d){return(d.path)})
      .style('opacity', function(d){
        if (d.path.includes('1994')){
            return(1)
        } else {
            return(0)
        }
      }
      )
      .attr('src', function(d) {return "highresimages_malawi_year_processed/"+ d.path})
}

//This is the global slider function that targets specific classes
function renderSlider(data){
    //I'm bringing data into this to access date range for tics
        x.domain([parseTime2(1991), parseTime2(2017)]);
        
        var tickAxis = d3.selectAll(".dateRangeTicks").append('svg')
                       .attr('width', width+20)
                       .attr('height', 14)
         var axisx = tickAxis.append('g')
                    .attr("transform", "translate(" + margin.left + "," + -4+ ")")



            // .data(data)
            .attr('class','timelineTicks')
            .call(d3.axisBottom(x).ticks(data.length).tickFormat(d3.timeFormat("%y")).tickSize(0));
            axisx.selectAll("line")
            .style("stroke", function(){
            return 'white'});
        // axisx.selectAll("text")
        //     // .style('fill', 'white')
        //      axisx
        //     .attr('text-anchor', "middle")
        //     .select(".domain")
        //     .remove();
        
        
        
        // d3.selectAll(".dateRangeTicks")
        //     .append('g')
        //     .attr('class','timelineTicks')
        //     .attr('width', 100000)
        //     .call(d3.axisBottom(x).ticks(data.length).tickPadding(5).tickFormat(d3.timeFormat("%Y"))
        //     // .attr('dx', '.71em')
        //     .tickSize(customSize(height,100)))
        //     .style('fill', '#ffffff')
            
        var dateRange  =  d3.selectAll('.dateRange')
        dateRange.style('width', width-25 + "px")
        
        dateRange.on("input",function(){
            loopThrough(this.value);
        })
}

///Play and stop buttons
var myTimer;
d3.select("#start").on("click", function() {
    d3.select("#start")
    .transition()
    // .style('opacity', '0')
    .style('visibility', 'hidden')
    
    d3.select('#stop')
    .transition()
    // .style('opacity', '1')
    .style('visibility', 'visible')

    
    clearInterval (myTimer);
	myTimer = setInterval (function() {
    var b= d3.selectAll(".dateRange");
    var t = (+b.property("value") + 1) % (+b.property("max") + 1);
    if (t == 0) { t = +b.property("min"); }
    b.property("value", t);
    console.log (t);
    loopThrough(t)
    }, 700);
   
});

 d3.select("#stop").on("click", function() {
     d3.select("#start")
     .transition()
    //   .style('opacity', '1')
      .style('visibility', 'visible')

    
    d3.select('#stop')
    .transition()
    // .style('opacity', '0')
    .style('visibility', 'hidden')

    
	clearInterval (myTimer);
});


// d3.select("#start").on("click", function() {
// 	clearInterval (myTimer);
// });

//////////////Variables for line Chart////////////////////////////////

var numberFormat = d3.format(".3n");

var parseTime = d3.timeParse("%y");
var parseTime2 = d3.timeParse("%Y");

var x = d3.scaleTime()
        .rangeRound([15, width-30]);

var y = d3.scaleLinear()
        .rangeRound([height - 20, 15]);
        
var x2 = d3.scaleTime()
        .rangeRound([0, width]);
        
var y2 = d3.scaleLinear()
        .rangeRound([height, 0]);
        
var bisectDate = d3.bisector(function(d) { return d.key; }).left

function customSize(heightOrWidth, num){
        return heightOrWidth-num
    }
var timeFormat = d3.timeFormat("%Y")

////////////////Render Line Charts///////////////////////

function renderlinechart(data){
    
    var div = d3.selectAll('.chartsContainer')
                .append('div')
                .attr('class','chartDiv'+ data[0].class)
                .style('height', height-5 + "px")
                // .attr('width', width)
                // .attr('class', function(d){return d.class})
    d3.selectAll('.chartDiv'+ data[0].class)
        .data(data)
        .append('div')
        .attr("class", "dataSummary")
        .text(function(d){return d.class.replace(/_/g, " ")})
        
    var svg =  div.append('svg')
                .attr('class', function(d){return d.class + "_svg"})
                .attr('height', height)
                .attr('width', width)
                
    var g = svg.append('g')
                .attr('class', data[0].class + "_g")
                .attr("transform", "translate(" + margin.left + "," + 17+ ")");
            
    x.domain([parseTime2(1991), parseTime2(2017)]);
    y.domain(d3.extent(data, function(d) { return d.value.avg; }));
            
    var x2 = d3.scaleTime()
        .domain(d3.extent(data, function(d) {return d.key;}))
        .range([0, 960]);

    var line = d3.line()
        .x(function(d) {return x(d.key); })
        .y(function(d) {return y(+d.value.avg); });

   
    var axisx = g.append('g')
        .data(data)
        .attr('class','tick')
        .call(d3.axisBottom(x).ticks(data.length).tickFormat(d3.timeFormat("%y")).tickSize(customSize(height,20)));
        axisx.selectAll("line")
        .style("stroke", function(){
        return 'white'});
        
        axisx
        .attr('text-anchor', "middle")
        .select(".domain")
        .remove();
    
    var axisy = g.append('g')
         .call(d3.axisLeft(y).tickSize(0));

        axisy
        .attr('text-anchor', "middle")
        .append("text")
        .attr("fill", "gray")
        .attr("y", 10)
        .attr("x", 50)
        .attr("dy", "1em")
        .attr('text-anchor', "end")
        // .text(function(d){return data[0].class})
        
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr('stroke', "gray")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 2)
            .attr('d', line)
    
    var label = g.append('g')
        .selectAll(".label")
        .data(data)
        .enter()
        .append("g")
        // .attr("class", function(d){return "label" + " ." + d.key})
        .attr("class", function(d){ return "label"})
        .attr("id", function(d){ return "label" + timeFormat(d.key)})
        .style('visibility', 'hidden')
        .attr("transform", function(d, i) { return "translate(" + x(d.key) + "," + y(d.value.avg) + ")"; })
        
    var labelText = label.append('text')
        .attr('class', function(d){return timeFormat(d.key)})
        .html(function(d){return numberFormat(d.value.avg)})
        // console.log (data[0].class + "_svg")
    ///////TOOLTIPS
    var focus = svg
        .append("g")
        .attr("class","focus")
        .style("display", "none");
        // focus.append("circle")
        //     .attr("r", 4.5);
        focus.append("text")
            .attr("x", 9)
            .attr("dy", ".35em");

    svg.append("rect")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
        .on("mousemove", mousemove);


    function mousemove() {

        var x0 = x.invert(d3.mouse(this)[0]),
            i = bisectDate(data, x0, 0),
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.key > d1.key - x0 ? d1: d0;
        
        focus.attr("transform", "translate(" + 100 + "," + 10+ ")");
        // focus.attr("transform", "translate(" + x(d.key) + "," + y(d.value.avg) + ")");
        // focus.select("text").text(timeFormat(d.key) + "_" + d.value.avg);
        var year = timeFormat(d.key)
        loopThrough(year)
        document.getElementById("timeSlider").value = year;
    }
  
  

    // var dateRange2  =  d3.selectAll('.dateRange')
        
    //     dateRange2.on("change",function(){
    //         var year = this.value
    //     })
 
}
//Load list of images to create img tags for each.

d3.csv("highresimages_malawi_year_processed/image_names_list.csv").then(function(data) {
    
    data.forEach(function(d, i){
    d.path = d.path.replace("'", '').replace("'", '')
    });
    
    renderMap(data)

});


//Load, parse and render NDVI per year: malawi


d3.csv("data/malawi_landsat_5_7_8_1990-2018.csv").then(function(data) {

    data.forEach(function(d){
        var dateArray = d.date.split("-", 3)
        var yearOnly = dateArray[2]
        var monthOnly = dateArray[1]
        var dayOnly = dateArray[0]

        d.year = +yearOnly
        d.month = monthOnly
        d.day = dayOnly
        
    });
    
    
    var sortDataByYearMean = d3.nest()
    .key(function(d) { return d.year; })
    .rollup(function(v) { return {
        count: v.length,
        avg: d3.mean(v, function(d) { return d.ndvi; })
    }; })
    .entries(data);
    
    console.log(sortDataByYearMean)
    //Make a unique class for data so my linechart divs have different classes


    sortDataByYearMean.forEach(function(d){
    d.class = 'Vegetation'
    d.key = parseTime(d.key)
    });
    
    renderlinechart(sortDataByYearMean);
    
    //Render worldbank AFTER NDVI
    d3.csv("data/worldBank.csv").then(function(data) {

            var gdp = []
            var agriculture = []

            data.forEach(function(d){
                
                if (+d['GDP per capita growth (annual %) [NY.GDP.PCAP.KD.ZG]'] && d.Time != "1990"){
                  var object = new Object()
                  object.key = parseTime2(+d.Time)
                  object.value = new Object()
                  object.value.avg = +d['GDP per capita growth (annual %) [NY.GDP.PCAP.KD.ZG]']
                  object.class = 'GDP';
                  gdp.push(object)
                }
                
                if (+d['Agriculture, value added per worker (constant 2010 US$) [NV.AGR.EMPL.KD]']){
                  var object = new Object()
                  object.key = parseTime2(+d.Time)
                  object.value = new Object()
                  object.value.avg = +d['Agriculture, value added per worker (constant 2010 US$) [NV.AGR.EMPL.KD]']
                  object.class = 'Agriculture_value_added_per_worker';
                  agriculture.push(object)
                }
            })

            renderlinechart(gdp);
            renderlinechart(agriculture);
            renderSlider(agriculture)

});

    
});