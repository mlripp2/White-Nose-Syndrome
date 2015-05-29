window.onload =initialize();
var year = 2006
var previousyear=year-1
var karstLayer = false
var bigBrownBatLayer = false
var lilBrownBatLayer = false
var grayBatLayer = false
var indianaBatLayer = false
var EasternSmllBatLayer = false
var longearedBatLayer = false
clicked = false;
function initialize(){
	setMap();
};

function setMap(){

	var width = 1100;
	var height = 630;

	var map = d3.select("#mapContainer").append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("class", "map");

	var projection = d3.geo.albers()
		.center([0, 40])
		
		.parallels([34, 45])
		.scale(1200)
		.translate([width / 2, height / 2]);

	var path = d3.geo.path()
		.projection(projection);
	$("#karst" ).click(function() {
		if (karstLayer == false){
		 d3.selectAll(".karst")
			.style("display","inline")
			karstLayer = true;
		d3.selectAll("#karst")
			.style("background-color", "#757554")
			.style("font-weight", "bold")
		}
		else{
			d3.selectAll(".karst")
			.style("display","none")
			karstLayer = false; 
			d3.selectAll("#karst")
				.style("background-color", "#E0E0E0")
				.style("font-weight", "normal");
			
		}
	});
	var path = d3.geo.path()
		.projection(projection);
	$("#bigBrown" ).click(function() {
		if (bigBrownBatLayer == false){
		d3.selectAll(".bigBrown")
			.style("display","inline")
			.style("opacity", ".4")
			.style("fill", "#B8704D");
			bigBrownBatLayer = true;

		d3.selectAll("#bigBrown")
			.style("background-color", "#B8704D")
			.style("font-weight", "bold")
		}
		else{
			d3.selectAll(".bigBrown")
				.style("display","none");
			bigBrownBatLayer = false;
			d3.selectAll("#bigBrown")
				.style("background-color", "#E0E0E0")
				.style("font-weight", "normal");

		}
	});

	var path = d3.geo.path()
		.projection(projection);
	$("#lilBrown" ).click(function() {
		if (lilBrownBatLayer == false){
		d3.selectAll(".lilBrown")
			.style("display","inline")
			.style("opacity", ".4")
			.style("fill", "#666633");
			lilBrownBatLayer = true; 
		d3.selectAll("#lilBrown")
			.style("background-color", "#666633")
			.style("font-weight", "bold")
		}
		else{
			d3.selectAll(".lilBrown")
			.style("display","none")
			lilBrownBatLayer = false;
			d3.selectAll("#lilBrown")
				.style("background-color", "#E0E0E0")
				.style("font-weight", "normal");

		}
	});

	var path = d3.geo.path()
		.projection(projection);
	$("#grayBat" ).click(function() {
		if (grayBatLayer == false){
		d3.selectAll(".grayBat")
			.style("display","inline")
			.style("opacity", ".4")
			.style("fill", "#666699");
			grayBatLayer = true;
		d3.selectAll("#grayBat")
			.style("background-color", "#666699")
			.style("font-weight", "bold")
		}
		else{
			d3.selectAll(".grayBat")
				.style("display","none");
			grayBatLayer = false;
			d3.selectAll("#grayBat")
				.style("background-color", "#E0E0E0")
				.style("font-weight", "normal");

		}
	});

	var path = d3.geo.path()
		.projection(projection);
	$("#indiBat" ).click(function() {
		if (indianaBatLayer == false){
		d3.selectAll(".indianaBat")
			.style("display","inline")
			.style("opacity", ".4")
			.style("fill", "#AD5C5C");
			indianaBatLayer = true;
		d3.selectAll("#indiBat")
			.style("background-color", "#AD5C5C")
			.style("font-weight", "bold")
		}
		else{
			d3.selectAll(".indianaBat")
				.style("display","none");
			indianaBatLayer = false;
			d3.selectAll("#indiBat")
				.style("background-color", "#E0E0E0")
				.style("font-weight", "normal");

		}
	});
	var path = d3.geo.path()
		.projection(projection);
	$("#northBat" ).click(function() {
		if (longearedBatLayer == false){
		d3.selectAll(".northernBat")
			.style("display","inline")
			.style("opacity", ".4")
			.style("fill", "#CCFF66");
			longearedBatLayer = true;
		d3.selectAll("#northBat")
			.style("background-color", "#CCFF66")
			.style("font-weight", "bold")
		}
		else{
			d3.selectAll(".northernBat")
				.style("display","none");
			longearedBatLayer = false;
			d3.selectAll("#northBat")
				.style("background-color", "#E0E0E0")
				.style("font-weight", "normal");

		}
	});

	var path = d3.geo.path()
		.projection(projection);
	$("#easternSmlFtBat" ).click(function() {
		if (EasternSmllBatLayer == false){
		d3.selectAll(".easternBat")
			.style("display","inline")
			.style("opacity", ".4")
			.style("fill", "#66B3B3");
			EasternSmllBatLayer = true;
		d3.selectAll("#easternSmlFtBat")
			.style("background-color", "#66B3B3")
			.style("font-weight", "bold")
		}
		else{
			d3.selectAll(".easternBat")
				.style("display","none");
			EasternSmllBatLayer = false;
			d3.selectAll("#easternSmlFtBat")
				.style("background-color", "#E0E0E0")
				.style("font-weight", "normal");

		}
	});

	
	queue()
		.defer(d3.json, "data/WNS_County.topojson")
		.defer(d3.json, "data/NorthAmerica.topojson")
		.defer(d3.json, "data/allcounties.topojson")
		.defer(d3.json, "data/Mexico.topojson")
		.defer(d3.json, "data/karst.topojson")
		.defer(d3.json, "data/bigBrownBat.topojson")
		.defer(d3.json, "data/littleBrownBat.topojson")
		.defer(d3.json, "data/GrayBat.topojson")
		.defer(d3.json, "data/Indiana.topojson")
		.defer(d3.json, "data/northernLongeared.topojson")
		.defer(d3.json, "data/EasternSmallfootedBat.topojson")
		.await(function(error, WNS_County, NorthAmerica, allcounties, Mexico, Karst, bigBrownBat, lilBrownBat, grayBat, indianaBat, northernBat, easternBat){
			callback(error, WNS_County, NorthAmerica, allcounties, Mexico, Karst, bigBrownBat, lilBrownBat, grayBat, indianaBat, northernBat, easternBat);
			makeGraph(WNS_County);
		})

	function callback(error, WNS_County, NorthAmerica, allcounties, Mexico, Karst, bigBrownBat, lilBrownBat, grayBat, indianaBat, northernBat, easternBat){
		
	    var allcounties= map.append("path")
	    	.datum(topojson.feature(allcounties, allcounties.objects.collection))
	       	.attr ("class", "allcounties")
	       	.attr("d", path);
	    var countries = map.append("path") 
	       	.datum(topojson.feature(NorthAmerica, NorthAmerica.objects.collection))
	       	.attr ("class", "countries")
	       	.attr("d", path);
	    var county = map.selectAll(".county") //create SVG path element
	        .data(topojson.feature(WNS_County, WNS_County.objects.collection).features)
	        .enter() //create elements
			.append("path") //give each province its own g element 
			
			.attr("class",function(d){
				return "county y"+ d.properties.WNS_Year
			})

			.attr("id",function(d){
				return "C"+ d.properties.OBJECTID
			})
			.attr("d",path)
			.style("display",function(d){
				if (d.properties.WNS_Year != year){
					return "none"
				}
				else{
					
					return "inline"

				}})
			.style("fill", function(d){
				if(d.properties.WNS_STATUS != 'Confirmed'){
					return "#fec44f"

				}
				else{
					return "#d95f0e"
				}
			
			})
		.on("mouseover", highlight)
		.on("mouseout", dehighlight)
		.on("mousemove", moveLabel);
	    var Mexico = map.append("path") 
	       	.datum(topojson.feature(Mexico, Mexico.objects.collection))
	       	.attr ("class", "Mexico")
	       	.attr("d", path);


	    var karst = map.append("path") 
	       	.datum(topojson.feature(Karst, Karst.objects.collection))
	       	.attr ("class", "karst")
	       	.style("display","none")
	       	.attr("d", path);
		
		var bigBrown = map.append("path") 
	       	.datum(topojson.feature(bigBrownBat, bigBrownBat.objects.collection))
	       	.attr ("class", "bigBrown")
	       	.style("display","none")
	       	.attr("d", path);

	  	var lilBrown = map.append("path") 
	       	.datum(topojson.feature(lilBrownBat, lilBrownBat.objects.collection))
	       	.attr ("class", "lilBrown")
	       	.style("display","none")
	       	.attr("d", path);
	  
	  	var grayBat = map.append("path") 
	       	.datum(topojson.feature(grayBat, grayBat.objects.collection))
	       	.attr ("class", "grayBat")
	       	.style("display","none")
	       	.attr("d", path);
	  	var indianaBat = map.append("path") 
	       	.datum(topojson.feature(indianaBat, indianaBat.objects.collection))
	       	.attr ("class", "indianaBat")
	       	.style("display","none")
	       	.attr("d", path);
	  	var northernBat = map.append("path") 
	       	.datum(topojson.feature(northernBat, northernBat.objects.collection))
	       	.attr ("class", "northernBat")
	       	.style("display","none")
	       	.attr("d", path);
	  	var easternBat = map.append("path") 
	       	.datum(topojson.feature(easternBat, easternBat.objects.collection))
	       	.attr ("class", "easternBat")
	       	.style("display","none")
	       	.attr("d", path);
		


	sequence()
};
function sequence(){
	
		$( ".selector" ).slider( { min:2006,max: 2013,value: 2006,});
			$( ".selector" ).on( "slidechange", function( event, ui ) {
				previousyear=year
				year = ui.value

				UpdateMap();
				})
		$("#clock").html(year)
	d3.selectAll("#play")
		.on("click",function(){
			if(clicked){			
			clicked = false;
			 clearInterval(tick)
			 d3.select("#play img").attr("src", "img/play.png")
			}
			else{
				tick = setInterval(function () {
		
					if(year == 2013){
						year = 2006
						UpdateMap()
					}
					else{
					year+=1 //how to include previous years 
					UpdateMap()
						
					}
				}, 1000);
				clicked = true;
				d3.select("#play img").attr("src", "img/pause.png")

				}
				
			
		}) 
}
function UpdateMap(){
 //if else statement that..anything greater than 0, get assigned year 
d3.selectAll('.county')
		.style("display","none");

 for(i = 2006; i <= year;i++){ 	
 	
	d3.selectAll('.y'+i)
		.style("display","inline");

d3.select("#clock").html(year)

console.log("current year:"+year )

}
}


};
function highlight(data){
	
	var props = data.properties ? data.properties: data;
	d3.selectAll('#C'+props.OBJECTID)
		.style("stroke-color", '#000000')
		.style("stroke-width", '3px');
		// }
	var labelAttribute = props.NAME;
	var labelName = "<h4>"+props.num_specie+" species at risk in:<br> "+props.NAME+" County</h4>"
	var unorder = "<ul>"
		var split = props.species_pr.split(",");
			
			if (split.length ==2){
	 			unorder = "<h6>Unknown Species at Risk<\h6>"
	 		}
			for (j in split){
				if (split[j].length > 3){
				var item = "<li>"+split[j]+"</li>";
				unorder += item
				}
		

	}
 
	unorder += "</ul>"
		 //the name of the country is not displaying in the popup on the bar chart  
	//console.log(props.NAME_1); //html string for name to go in child div
	//create info label div
	var infolabel = d3.select("body")
		.append("div") //create the label div
		.attr("class", "infolabel")
		.attr("id", '#C'+props.OBJECTID) //for styling label
		.html(labelName) //add text
		.append("div") //add child div for feature name
		.attr("class", "labelName") //for styling name
		.html(unorder); //add feature name to label
	}
function dehighlight(data){
	var props = data.properties ? data.properties: data;
	d3.selectAll('#C'+props.OBJECTID)
		.style("stroke-width", '1px')
		.style("stroke-color", "black");

	//bar.style("fill", fillcolor) //reset enumeration unit to orginal color
	d3.select(".infolabel").remove(); //remove info label

};


function makeGraph(data1){
var data =[]
var years = []
var states = []
var suspectSet = [];
var confirmSet = []
var totalSet = []
for (i in data1.objects.collection.geometries){
	data.push(data1.objects.collection.geometries[i].properties)
	years.push(data1.objects.collection.geometries[i].properties.WNS_Year)
}
years = d3.set(years).values()
for(i in years){
		confirmCount = 0;
		suspectCount =0;
		totalCount = 0;
 		for (j in data){
 			
 			if (data[j].WNS_Year == years[i] && data[j].WNS_STATUS== "Confirmed"){

 				confirmCount++;
 				totalCount ++;
 			}
 			else if(data[j].WNS_Year == years[i]  && data[j].WNS_STATUS == "Suspect"){
 				suspectCount++
 				totalCount++;
 			}

 		}
 		suspectSet[i] = [suspectCount,years[i],confirmCount];
 		 totalSet[i] = [totalCount];
	}
 suspectSet = suspectSet.sort(function(a, b){return a[1]-b[1]});
 totalSet = totalSet.sort(function(a, b){return a[1]-b[1]});
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 400 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .rangeRound([height, 0]);

var color = d3.scale.ordinal()
    .range(["#E65C00", "#d95f0e"]); //this defines the two colors for the different cateogries (confirmed vs. suspected)

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

var chart = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
x.domain(data.map(function(d) { return d.WNS_Year; }).sort(function(a,b){return a-b}));
 //want x axis to be each state
 y.domain([0, d3.max(totalSet)]); //want y value to show totals THIS IS WHERE THE TOTAL FOR EACH YEAR WHILL GO WHICH WILL BE DETERMINED BY FROM SOMETHING WITHIN THE LOOP. I think it will have to be an array filled with the alues for each year, and then those will match up with the chronological order.
console.log(totalSet[0])
  chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  chart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Number of Cases");

  var year = chart.selectAll(".year")
      .data(data)
    .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) { return "translate(" + x(d.WNS_Year) + ",0)"; });

  var legend = chart.selectAll(".legend")
      .data(color.domain().slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });

  var bars = chart.selectAll(".bar")
		.data(suspectSet)
		.enter()
		.append("rect")
		.attr("id",function(a){
			return a[0]+"suspect"
		})
		.attr("width", width / years.length - 1)
		.attr("height",function(a){
			return a[0]*5
		})
		.attr("y", function(a){ return (height) - Number(a[0])*5})

		.attr("x", function(a,i){

			return i * (width / years.length)
		})
		.style("fill","yellow");
            
	var stackBars = chart.selectAll(".bar")
		.data(suspectSet)
		.enter()
		.append("rect")
		.attr("id",function(a){
			return a[2]+"confirmed"
		})
		.attr("width", width / years.length - 1)
		.attr("height",function(a){
			return a[2]*4
		})
		.attr("y", function(a){ return (height) - (a[0]+a[2])*4})
		.attr("x", function(a,i){
			return i * (width / years.length)
		})
		.style("fill","orange");;
	

	
		
		
}

function moveLabel() {
	console.log(d3.event.clientY+ " "+d3.event.clientX);

	if (d3.event.clientX < window.innerWidth){
		var x = d3.event.clientX+20; //horizontal label coordinate based mouse position stored in d3.event
	} else {
		var x = d3.event.clientX+20; //horizontal label coordinate based mouse position stored in d3.event
	};
	if (d3.event.clientY < window.innerHeight){
		var y = d3.event.clientY+100; //vertical label coordinate
	} else {
		var y = d3.event.clientY+100; //vertical label coordinate
	};
	console.log(d3.select(".infolabel"))
	d3.select(".infolabel") //select the label div for moving
		.style("left", x+"px") //reposition label horizontal
		.style("top", y+"px"); //reposition label vertical
};	


