window.onload =initialize();

function initialize(){
	setMap();
};


function setMap(){

	var width = 600;
	var height = 300;

	var map = d3.select("body")
		.attr("width",width)
		.attr("height",height)
		.attr("class", "map");

var projection = d3.geo.albers()
		.center([-8, 46.2])
		.rotate([-10, 0])
		.parallels([43, 62])
		.scale(2900)
		.translate([width / 2, height / 2]);

	var path = d3.geo.path()
		.projection(projection);
			var graticule = d3.geo.graticule()
		.step([10, 10]); //place graticule lines every 10 degrees of longitude and latitude
	
	//create graticule background
	var gratBackground = map.append("path")
		.datum(graticule.outline) //bind graticule background
		.attr("class", "gratBackground") //assign class for styling
		.attr("d", path) //project graticule
	
	//create graticule lines	
	var gratLines = map.selectAll(".gratLines") //select graticule elements that will be created
		.data(graticule.lines) //bind graticule lines to each element to be created
	  	.enter() //create an element for each datum
		.append("path") //append each element to the svg as a path element
		.attr("class", "gratLines") //assign class for styling
		.attr("d", path); 

	queue()
		.defer(d3.json, "data/WNS_County.topojson")
		.defer(d3.json, "data/NorthAmerica.topojson")
		.await(callback);

	function callback(error, WNS_County, NorthAmerica){

		console.log(NorthAmerica.objects.countries);
		
	   	
	   	var countries = map.append("path") 
	       	.datum(topojson.feature(NorthAmerica, NorthAmerica.objects.countries))
	       	.attr ("class", "countries")
	       	.attr("d", path);

	    var county = map.selectAll(".county") //create SVG path element
	        .data(topojson.feature(WNS_County, WNS_County.objects.collection))
	        .enter() //create elements
			.append("g") //give each province its own g element 
			.attr("class", "county")
			.append("path")
			.attr("class",function(d){return d.properties})
			.attr("d",path);
	};
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