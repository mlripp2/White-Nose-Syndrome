window.onload =initialize();


function setMap(){
	var width = 600;
	var height = 300;

	var map = d3.select("body")
		.attr("width",width)
		.attr("height",height)
		.attr("class", "map");
	
	var projection = d3.geo.albersUsa()
		.scale(600)
		.translate([width / 2, height / 2]);
	
	var path = d3.geo.path()
		.projection(projection);
	
	
	queue()
		.defer(d3.json, "data/WNS_County.topojson")
		.defer(d3.json, "data/NorthAmerica.topojson")
		.await(callback);
	}

function callback (WNS_County, NorthAmerica)

	var county = map.selectAll("county") //create SVG path element
        .data(topojson.feature(WNS_County, WNS_County.objects.collection)
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
	};