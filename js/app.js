var w=window.innerWidth;
var h=window.innerHeight;
var margin={top:30,right:30,bottom:30,left:30};
var width=w-margin.left-margin.right;
var height=h-margin.top-margin.bottom;
var svg=d3.select("body")
.append("svg")
.attr({id:"chart",
       width:w,
       height:h});
var chart=svg.append("g")
.attr({transform:"translate("+margin.left+","+margin.top+")"});
var	scale=width/(2*Math.PI);
var projection=d3.geo.mercator()
				.scale(scale)
				.translate([width/2,height/2]);
var pathGenerator=d3.geo.path()
					.projection(projection);

d3.json("countries.topojson",function(error,data){
	if(error){
		console.log(error);
	}else{
		console.log(data);
	}
	var geodata=topojson.feature(data,data.objects.countries);
	var features=chart.selectAll("path.feature")
					.data(geodata.features)
					.enter()
					.append("path")
					.attr("class","feature")
					.attr("d",pathGenerator);
});