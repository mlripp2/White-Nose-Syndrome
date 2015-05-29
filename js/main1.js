window.onload =initialize();
var year = 2006
var previousyear=year-1

clicked = false;
function initialize(){
	setMap();
};

function setMap(){

	var width = 900;
	var height = 650;

	var map = d3.select("body").append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("class", "map");

	var projection = d3.geo.albers()
		.center([20, 37.5])
		
		.parallels([35, 45])
		.scale(1400)
		.translate([width / 2, height / 2]);

	var path = d3.geo.path()
		.projection(projection);
	

	queue()
		.defer(d3.json, "data/WNS_County.topojson")
		.defer(d3.json, "data/NorthAmerica.topojson")
		.await(callback);
		// .await(function(error, WNS_County, NorthAmerica){
		// 	callback(error, WNS_County, NorthAmerica);
		// 	makeGraph(WNS_County);
		// })

	function callback(error, WNS_County, NorthAmerica){

		console.log(NorthAmerica);
		
		console.log(WNS_County);

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
					console.log(d)
					return "inline"

				}})
			.style("fill", function(d){
				if(d.properties.WNS_STATUS != 'Confirmed'){
					return "#fec44f"

				}
				else{
					console.log("hey")
					return "#d95f0e"
				}
			
			})
		.on("mouseover", highlight)
		.on("mouseout", dehighlight)
		.on("mousemove", moveLabel);
		

	sequence()
};
function sequence(){
	
		$( ".selector" ).slider( { min:2006,max: 2013,value: 2006,});
			$( ".selector" ).on( "slidechange", function( event, ui ) {
				previousyear=year
				year = ui.value

				UpdateMap();
				})
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
				}, 3000);
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
 	console.log(i)
	d3.selectAll('.y'+i)
		.style("display","inline");

d3.select("#clock").html(year)

console.log("current year:"+year )

}
}


};
function highlight(data){
	
	var props = data.properties ? data.properties: data;
	console.log(d3.selectAll('#C'+props.OBJECTID))
	d3.selectAll('#C'+props.OBJECTID)
		.style("stroke-color", '#000')
		.style("stroke-width", '3px');
		// }
	var labelAttribute = props.NAME;
	var labelName = "<h1>"+props.num_specie+" species at risk in "+props.NAME+" County</h1>"
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
	console.log(unorder)
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

for (i in data1.objects.collection.geometries){
	data.push(data1.objects.collection.geometries[i].properties)
	years.push(data1.objects.collection.geometries[i].properties.WNS_Year)
}
yearSet = d3.set(years).values()
console.log(yearSet)
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .rangeRound([height, 0]);

var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6"]); //this defines the two colors for the different cateogries (confirmed vs. suspected)

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
x.domain(data.map(function(d) { return d.WNS_Year; })); //want x axis to be each state
 y.domain([0,d3.max(data,function(d){
 	for(i in yearSet){
 		array = []
 		for (j in d){
 			if (d.WNS_Year = yearSet[i]){
 				array.push(d.WNS_Year)
 			}
 			yearSet[i] = array
 		}

 	}
 	
 	
 	
 }) ]) //want y value to show totals THIS IS WHERE THE TOTAL FOR EACH YEAR WHILL GO WHICH WILL BE DETERMINED BY FROM SOMETHING WITHIN THE LOOP. I think it will have to be an array filled with the alues for each year, and then those will match up with the chronological order.

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Number of Cases");

  var year = svg.selectAll(".year")
      .data(data)
    .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) { return "translate(" + x(d.WNS_Year) + ",0)"; });

  year.selectAll("rect")
      .data(function(d) { return d.cases; }) //this is going to be where you hold which cases are which
      .enter().append("rect")
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.y1); })
      .attr("height", function(d) { return y(d.y0) - y(d.y1); })
      .style("fill", function(d) { return color(d.name); });

  var legend = svg.selectAll(".legend")
      .data(color.domain().slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });


}

function moveLabel() {
	console.log(d3.event.clientY+window.pageYOffset, window.innerHeight);

	if (d3.event.clientX < window.innerWidth - 280){
		var x = d3.event.clientX; //horizontal label coordinate based mouse position stored in d3.event
	} else {
		var x = d3.event.clientX - 300; //horizontal label coordinate based mouse position stored in d3.event
	};
	if (d3.event.clientY < window.innerHeight + 100){
		var y = d3.event.clientY+window.pageYOffset-750; //vertical label coordinate
	} else {
		var y = d3.event.clientY+window.pageYOffset-50; //vertical label coordinate
	};
	//console.log(d3.select(".infolabel"))
	d3.select(".infolabel") //select the label div for moving
		.style("margin-left", x+"px") //reposition label horizontal
		.style("margin-top", y+"px"); //reposition label vertical
};	


