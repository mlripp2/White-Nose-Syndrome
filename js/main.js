window.onload =initialize();
var year = 2006

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
			 d3.select("#play img").attr("src", "img/play.png")
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
				d3.select("#play img").attr("src", "img/pause.png")

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
	

	
