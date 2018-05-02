var width = window.innerWidth/1.7;
var height = window.innerHeight/3.8;
var margin = {top: 10, right: 10, bottom: 15, left: 20}
var sliderFreeInput = document.getElementById("timeSlider");



//Creates Raster Map Image Compillation. Loads them all at init

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
function renderSlider(){
  
        var dateRange  =  d3.selectAll('.dateRange')
        dateRange.style('width', width-25 + "px")
        dateRange.on("input",function(){
            var year = this.value
            d3.select('#mapTitleDate')
                    .text(this.value)
            
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

            d3.selectAll('g.tick')
                 .filter(function(d){
                  var val = parseTime2(year).toString();
                  if (+d){
                  }
                  ;} )
                })

        })
}



//////////////Variables for line Chart////////////////////////////////



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

////////////////Render Line Chart///////////////////////


function renderlinechart(data){
    
    var div = d3.selectAll('.chartsContainer')
                .append('div')
                .attr('class','chartDiv'+ data[0].class)
                .attr('height', height)
                .attr('width', width)
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
                // .attr('class', data.class + "_g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            
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
        
        // console.log (data[0].class + "_svg")
    ///////TOOLTIPS
    var focus = svg
        .append("g")
        .attr("class","focus")
        .style("display", "none");

        focus.append("circle")
            .attr("r", 4.5);

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

    var timeFormat = d3.timeFormat("%Y")
    
    function mousemove() {

        var x0 = x.invert(d3.mouse(this)[0]),
            i = bisectDate(data, x0, 0),
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.key > d1.key - x0 ? d1: d0;
        
        focus.attr("transform", "translate(" + 100 + "," + 10+ ")");
        // focus.attr("transform", "translate(" + x(d.key) + "," + y(d.value.avg) + ")");
        focus.select("text").text(timeFormat(d.key) + "_" + d.value.avg);
    }
  
  

    var dateRange2  =  d3.selectAll('.dateRange')
        
        dateRange2.on("change",function(){
            var year = this.value
        })
 
}
//Load list of images to create img tags for each.

d3.csv("highresimages_malawi_year_processed/image_names_list.csv").then(function(data) {
    
    data.forEach(function(d, i){
    d.path = d.path.replace("'", '').replace("'", '')
    });
    
    renderMap(data)
    renderSlider()

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
            //create data buckets to send through my render function
            // var gini = []
            var gdp = []
            var agriculture = []

            data.forEach(function(d){
                // if (+d['GINI index (World Bank estimate) [SI.POV.GINI]']){
                //   var object = new Object()
                //   object.key = parseTime2(+d.Time)
                //   object.value = new Object()
                //   object.value.avg = +d['GINI index (World Bank estimate) [SI.POV.GINI]']
                //   object.class = 'gini';
                //   gini.push(object)
                // }
                
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
            
});

    
});


