window.onload =initialize();
var year = 2006
var previousyear=year-1

clicked = false;
function initialize(){
	setMap();
};

function setMap(){

	var width = 700;
	var height = 400;

	var map = d3.select("body").append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("class", "map");

	var projection = d3.geo.albers()
		.center([0, 40])
		.rotate([95, 0])
		.parallels([35, 45])
		.scale(800)
		.translate([width / 2, height / 2]);

	var path = d3.geo.path()
		.projection(projection);
	

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
			
			.attr("class",function(d){
				return "county y"+ d.properties.WNS_Year
			})
			.attr("d",path)
			.style("display",function(d){
				if (d.properties.WNS_Year != year){
					return "none"
				}
				else{
					return "inline"
				}
			d3.select	
			.style("fill", function(d){
				if(d.properties.WNS_STATUS != 'Confirmed'){
					return d.color
				}
			
			});
		
	});
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
function UpdateMap(){ //if else statement that..anything greater than 0, get assigned year 
	if (year < 0)	{
	d3.selectAll('.y' + previousyear)
		.style("display","none")}

	else{
	d3.selectAll('.y'+year)
		.style("display","inline")};


d3.select("#clock").html(year)

console.log(year)
}
	

function highlight(data){
	var props = data.properties ? data.properties: data;

	d3.selectAll('.WNS'+props.name)
		.style("fill", '#000')
	d3.selectAll('.WNS'+props.name)
		.style("fill", '#000')
	}
};	

	
