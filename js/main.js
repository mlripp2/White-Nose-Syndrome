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
	var labelName = "<h1>"+props.num_specie+" Species Effected in "+props.NAME+" County</h1>"
	var unorder = "<ul>"
		var split = props.species_pr.split(",");
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

function moveLabel() {

	if (d3.event.clientX < window.innerWidth + 245){
		var x = d3.event.clientX; //horizontal label coordinate based mouse position stored in d3.event
	} else {
		var x = d3.event.clientX; //horizontal label coordinate based mouse position stored in d3.event
	};
	if (d3.event.clientY < window.innerHeight + 100){
		var y = d3.event.clientY-400; //vertical label coordinate
	} else {
		var y = d3.event.clientY-400; //vertical label coordinate
	};
	//console.log(d3.select(".infolabel"))
	d3.select(".infolabel") //select the label div for moving
		.style("margin-left", x+"px") //reposition label horizontal
		.style("margin-top", y+"px"); //reposition label vertical
};	

/*test change for upload*/
	
