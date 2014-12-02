window.onload =initialize();
//Kelly's Edits!
function initialize(){
	setMap();
};


function setMap(){
	//var width = 600;
	//var height = 300;

/*	var map = d3.select("body")
		.attr("width",width)
		.attr("height",height)
		.attr("class", "map");
	
	var projection = d3.geo.albersUsa()
		.scale(600)
		.translate([width / 2, height / 2]);
	
	var path = d3.geo.path()
		.projection(projection);*/
	

/**
 * Fetches the JSON object and loads it asynchronously for use.
 * Queue waits until the json files are completely loaded and then calls 
 * the function in await to start everything else
 */
function getdata(){	
	queue()
		.defer(d3.json, "data/WNS_County.topojson")
		.defer(d3.json, "data/NorthAmerica.topojson")
		.await(callback);
	}

function callback (error, WNS_County, NorthAmerica){
	console.log(NorthAmerica);
	}

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