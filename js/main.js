window.onload =initialize();
var year = 2006

clicked = false;
function initialize(){
	setMap();
};

function setMap(){

	var width = 600;
	var height = 300;

	var map = d3.select("body").append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("class", "map");

	var projection = d3.geo.albers()
		.center([0, 41])
		.rotate([95, 0])
		.parallels([35, 45])
		.scale(500)
		.translate([width / 2, height / 2]);

	var path = d3.geo.path()
		.projection(projection);
	
	// var graticule = d3.geo.graticule()
	// 	.step([10, 10]); //place graticule lines every 10 degrees of longitude and latitude
	
	// //create graticule background
	// var gratBackground = map.append("path")
	// 	.datum(graticule.outline) //bind graticule background
	// 	.attr("class", "gratBackground") //assign class for styling
	// 	.attr("d", path) //project graticule
	
	// //create graticule lines	
	// var gratLines = map.selectAll(".gratLines") //select graticule elements that will be created
	// 	.data(graticule.lines) //bind graticule lines to each element to be created
	//   	.enter() //create an element for each datum
	// 	.append("path") //append each element to the svg as a path element
	// 	.attr("class", "gratLines") //assign class for styling
	// 	.attr("d", path); 
	

	queue()
		.defer(d3.json, "data/WNS_County.topojson")
		.defer(d3.json, "data/NorthAmerica.topojson")
		.await(callback);

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
			.attr("class", "county")
			.attr("id",function(d){
				return "y"+ d.properties.WNS_Year
			})
			
			.attr("d",path)
			.style("display",function(d){
				if (d.properties.WNS_Year != year){
					return "none"
				}
				else{
					return "inline"
				}
			});
		
	};
	sequence()
};
function sequence(){
	
		$( ".selector" ).slider( { min:2006,max: 2013,value: 2006,});
			$( ".selector" ).on( "slidechange", function( event, ui ) {
				year = ui.value
				UpdateMap();
				})
	d3.selectAll("#play")
		.on("click",function(){
			if(clicked){			
			clicked = false;
			 clearInterval(tick)
			 d3.select("#play").html("Play")
			}
			else{
				console.log("hey")
				tick = setInterval(function () {
		
					if(year == 2013){
						year = 2006
						UpdateMap()
					}
					else{
					year+=1
					UpdateMap()
						
					}
				}, 3000);
				clicked = true;
				d3.select("#play").html("Pause")

				}
				
			
		}) 
}
function UpdateMap(){
	console.log("hey")
d3.selectAll('.county')
	.style("display","none");
d3.selectAll('#y'+year)
	.style("display","inline");

d3.select("#clock").html(year)
}
	

	

/**
 * Fetches the JSON object and loads it asynchronously for use.
 * Queue waits until the json files are completely loaded and then calls 
 * the function in await to start everything else
 */
// function getdata(){	
// 	queue()
// 		.defer(d3.json, "data/WNS_County.topojson")
// 		.defer(d3.json, "data/NorthAmerica.topojson")
// 		.await(callback);
// 	}

// function callback (error, WNS_County, NorthAmerica){
// 	console.log(NorthAmerica);
// 	}

/*	var county = map.selectAll(".county") //create SVG path element
        .data(topojson.feature(WNS_County, WNS_County.type.objects.collection)
        .enter() //create elements
		.append("g") //give each province its own g element 
		.attr("class", "county")
		.append("path")

   	var countries = map.append("path") 
       	.datum(topojson.feature(NorthAmerica, NorthAmerica.objects.collection))
       	.attr ("class", "countries")
       	.attr("d", path);
       
       	createDropdown(csvData); //create the dropdown menu
		setChart(csvData, colorize); //create the bar chart
	};*/