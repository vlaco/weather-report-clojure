
var dataset = [55, 33, 15, 10, 3];
var cities = ["New York", "Toronto", "Buenos Aires", "New Delhi", "Sydney"];
var dateVals = [54, 41, 15, 10, 8];
var dates = ["2012-12-22", "2010-10-02","2012-05-17", "2011-03-29", "2014-08-06"];






function extractCites(dataset, cities){
  var dataSetNew = [];
var restDataset = [];
var citiesNew = [];
var restCities = [];

  var sum = 0;
  var sumArr1 = sumArr(dataset);
  //var dataSetNew = [];
  for(var i=0; i<dataset.length; i++){
    if(sum/sumArr1>=0.95 || i>8){
      restDataset.push(dataset[i]);
      restCompanies.push(cities[i]);
      sum+=dataset[i];
    } else {
      dataSetNew.push(dataset[i]);
      citiesNew.push(cities[i]);
      sum+=dataset[i];
    }
  }
  citiesNew.push("Rest");
  dataSetNew.push(sumArr(restDataset));
  return [dataSetNew, companiesNew, restDataset, restCities];
}




function extractDates(dateValues, dates){
  var dateValsNew = [];
var restDateValsset = [];
var datesNew = [];
var restDates = [];
  var sum = 0;
  var sumArr1 = sumArr(dateValues);
  var dataSetNew = [];
  for(var i=0; i<dateValues.length; i++){
    if(sum/sumArr1>=0.9 || i>5){
      restDateValsset.push(dateValues[i]);
      restDates.push(dates[i]);
      sum+=dateValues[i];
    } else {
      dateValsNew.push(dateValues[i]);
      datesNew.push(dates[i]);
      sum+=dateValues[i];
    }
  }
  return [dateValsNew, datesNew, restDateValsset, restDates];
  
}

function show1(dataset, cities) {
  extractCities(dataset, cities);
  for(var i=0; i<datasetNew.length; i++){
    document.write("DATA " + datasetNew[i]+"\n");
    document.write('</br>');
    document.write("City " + citiesNew[i] +"\n");
    document.write('</br>');
  }
  for(var i=0; i<restDataset.length; i++){
    document.write("Rest DATA " + restDataset[i]+"\n");
    document.write('</br>');
    document.write("Rest City " + restCities[i] +"\n");
    document.write('</br>');
  }
}

function show2(dateVals, dates) {

  extractDates(dateVals, dates);

  for(var i=0; i<dateValsNew.length; i++){
    document.write("DATA " + dateValsNew[i]+"\n");
    document.write('</br>');
    document.write("Date " + datesNew[i] +"\n");
    document.write('</br>');
  }
  for(var i=0; i<restDateValsset.length; i++){
    document.write("Rest DATA " + restDateValsset[i]+"\n");
    document.write('</br>');
    document.write("Rest date " + restDates[i] +"\n");
    document.write('</br>');
  }
}




function sumArr (array){
  var s=0;
  for(var i=0; i<array.length; i++){
    s+=array[i];
  };
  return s;
  // return array.reduce(function(pv, cv) { return pv + cv; }, 0);
}

function createColorSet (dataset, colorSet, intensity){
  var maxBarHeight = dataset[0];
  if(colorSet[1]<=colorSet[0]){
    var colorvaRed = Math.round(colorSet[1]+(intensity * (colorSet[0]-colorSet[1]))/maxBarHeight);
  } else {
    var colorvaRed = Math.round(colorSet[1]-(intensity * (colorSet[1]-colorSet[0]))/maxBarHeight);
  }
  if(colorSet[3]<=colorSet[0]){
    var colorvalGreen = Math.round(colorSet[3]+(intensity * (colorSet[2]-colorSet[3]))/maxBarHeight);
  } else {
    var colorvalGreen = Math.round(colorSet[3]-(intensity * (colorSet[3]-colorSet[2]))/maxBarHeight);
  }
  if(colorSet[5]<=colorSet[4]){
    var colorvalBlue = Math.round(colorSet[5]+(intensity * (colorSet[4]-colorSet[5]))/maxBarHeight);
  } else {
    var colorvalBlue = Math.round(colorSet[5]-(intensity * (colorSet[5]-colorSet[4]))/maxBarHeight);
  }
  return "rgb("+colorvaRed+", "+colorvalGreen+", " + colorvalBlue + ")";
}

 


function createSVG(citiesValues, citiesNames, dateNames, dateValues, colorSet, num){
var resultCit = extractCities(citiesValues, citiesNames);
var resultDate = extractDates(dateValues, dateNames);

  var dataset = resultCit[0];
  var cities = resultCit[1];
  var dateData = resultDate [0];
  var dateVals = resultDate [1];

  var restCitValues = resultCit[2];
  var restCitNames = resultCit[3];
  var restDateValues = resultDate[2];
  var restDateNames = resultDate[3];

 var width = 1360;
 // var width = $(document).width();
  var CitiesWidth = 0.7*width;
  var DateWidth = 0.3*width;
  
  var height = 300;
  var barPadding = 5;
  var labelHeight = 40;
  var maxBarHeight = dataset[0]*(height-labelHeight)/height;
  var maxDateWidth = dateVals[0];

  

  var svgC = d3.select("body")
                .append("svg");
  var svg0 = svgC.append("svg");
  var svg1 = svgC.append("svg");

  svgC.attr("width", width)
      .attr("height", height+40);

  svg0.attr("width", width)
      .attr("height", 40);

  svg0.append("text")
      .attr("x", 0.7*width/2)
      .attr("y", 23)
      .text("Cities")
      .attr("text-anchor", "middle")
      .attr("font-family", "Helvetica")
      .attr("font-size", "30px")
       .attr("fill", "rgb(80,80,80)");

svg0.append("text")
      .attr("x", 0.7*width+0.3*width/2)
      .attr("y", 23)
      .text("Date")
      .attr("text-anchor", "middle")
      .attr("font-family", "Helvetica")
      .attr("font-size", "25px")
      .attr("fill", "rgb(80,80,80)");

      //linije ispod labela
  // svg0.append("rect")
  //     .attr("width", 180)
  //     .attr("height", 2)
  //     .attr("x", 0.7*width/2-90)
  //     .attr("y", 30)
  //     .attr("fill", "teal");

  // svg0.append("rect")
  //     .attr("width", 100)
  //     .attr("height", 2)
  //     .attr("x", 0.7*width+0.3*width/2-50)
  //     .attr("y", 30)
  //     .attr("fill", "teal");
 

  svg1.attr("width", width)
  .attr("height", height)
  .attr("y", 40)
  .attr("id", "main"+num)
  .selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", function(d, i){
    return i*(CitiesWidth/dataset.length);
  })
  .attr("y", function(d){
    return (height-labelHeight) - (d*(height-labelHeight)/maxBarHeight)*(height-labelHeight)/height;
  })
  .attr("width", CitiesWidth/dataset.length - barPadding)
  .attr("height", function(d){
    return (d*(height-labelHeight)/maxBarHeight)*(height-labelHeight)/height;
      // d*height/maxBarHeight-labelHeight;
    })
  .attr("fill", function(d) {
    return createColorSet(dataset, colorSet, d);
  });

  var textL = svg1.selectAll("text")
  .data(cities)
  .enter()
  .append("text")
  // .text(function(d,i){
    
  //  return d+" (" + +(dataset[i]*100/sumArr(dataset)).toFixed(1)+"%)";
  // })
  .attr("x", function(d, i){
   return i*(CitiesWidth/dataset.length)+(CitiesWidth/dataset.length)/2;
 })
  .attr("y", function(d){
    return height;
  })
  .attr("text-anchor", "middle")
  .attr("font-family", "sans-serif")
  .attr("font-size", "12px")
  .attr("fill", "black");
  
  textL.append("tspan")
  .attr("x", function(d, i){
   return i*(CitiesWidth/dataset.length)+(CitiesWidth/dataset.length)/2;
 })
  .attr("y", function(d){
    return height - labelHeight + 15;
  })
  .text(function(d){
     return getFullName(d).substring(0,14);
  });
  textL.append("tspan")
  .attr("x", function(d, i){
   return i*(CitiesWidth/dataset.length)+(CitiesWidth/dataset.length)/2;
 })
  .attr("y", function(d){
    return height- 10;
  })
  .text(function(d,i){
     return " (" + +(dataset[i]*100/sumArr(dataset)).toFixed(1)+"%)";
  });

  // textL.append("tspan")
  // .attr(y,)
  // .text("dddvghghjhjh");
  // textL.append("tspan")
  // .text("dcc");





  var svg2 = svg1.append("svg");


  svg2.attr("width", DateWidth)
  .attr("height", height)
  .attr("fill", "black")
  .attr("x", CitiesWidth);

  var horBarHeight = 35;
  var topOffset = (height - (dateVals.length * horBarHeight))/2;

  svg2.selectAll("rect")
  .data(dateVals)
  .enter()
  .append("rect")
  .attr("x", barPadding)
  .attr("y", function(d,i){
   return topOffset+i*horBarHeight;
 })
  .attr("width", function(d){
    return d*DateWidth/maxDateWidth*3/5;
  })
  .attr("height", horBarHeight - barPadding)
  .attr("fill", function(d) {
    return createColorSet(dateVals, [0,200,0,200,0,200], d);
  });

  svg2.selectAll("text")
  .data(dateData)
  .enter()
  .append("text")
  .text(function(d,i){
    return formatDate(d);
          // +" (" + +(dates[i]*100/sumArr(dates)).toFixed(1)+"%)";
        })
  .attr("x", function(d, i){
    return (dateVals[i])*DateWidth/maxDateWidth*3/5+15;
  })
  .attr("y", function(d,i){
    return topOffset+i*horBarHeight+ horBarHeight/2 ;
  })
  .attr("font-family", "sans-serif")
  .attr("font-size", "14px")
  .attr("fill", "black");





  createRest(height, svg1, restCitValues,restCitNames, colorSet, num);


}

function createRest(height, svgParent, restCitValues,restCitNames, colorSet, num){
 d3.select("body")
 .selectAll("tspan")
 .filter(function(d){
  return d=="Rest";
 })
//  .on("mouseover", function(){
//   this.style.cursor="pointer";
//   d3.select(this)
//           .attr("fill", "teal");
//  })
//  .on("mouseout", function(d) {
//         d3.select(this)
//       .attr("fill", "rgb(0, 0, 0)");
// })
//  .on("click", function(){
//   expand(height, restCitValues.length,num);
//  });

//restCitValues = [180,177,155,149,147,146,106,92,85,80,69,63,58,10,5];
var maxRest = restCitValues[0];

 var restSVG = svgParent.append("svg")
 .attr("height", height+Math.ceil(restCitValues.length/10)*height)
 .attr("id", "rest"+num);
 var newHeight = height*0.85;

restSVG.selectAll("rect")
.data(restCitValues)
.enter()
 .append("rect")
  .attr("x", function(d,i){
    return (i%10)*100;
  })
  .attr("y", function(d, i){
    
    return (2*height+height*Math.floor(i/10))-(height - newHeight)-d*newHeight/maxRest;
  })
  .attr("width", 90)
  .attr("height", function(d){
    
    return d*newHeight/maxRest;
  })
    .attr("fill", function(d){
      return createColorSet(restCompValues, colorSet, d)
    });

var textRest = restSVG.selectAll("text")
  .data(restCitNames)
  .enter()
  .append("text")
  .attr("x", function(d,i){
    return (i%10)*100+45;
  })
  .attr("y", function(d,i){
    return 2*height+height*Math.floor(i/10);
  })
  .text(function(d){
    // return d;
  })
  .attr("text-anchor", "middle");


  textRest.append("tspan")
  .attr("x", function(d,i){
    return (i%10)*100+45;
  })
  .attr("y", function(d,i){
    return 2*height+height*Math.floor(i/10)-height*0.08;
  })
  .text(function(d){
    var dd = getFullName(d);
     return dd;

  })

   textRest.append("tspan")
  .attr("x", function(d,i){
    return (i%10)*100+45;
  })
  .attr("y", function(d,i){
    return 2*height+height*Math.floor(i/10)-height*0.01;
  })
  .text(function(d,i){
     return " (" + +(restCompValues[i]*100/sumArr(restCitValues)).toFixed(1)+"%)";
  })

}

function expand(height, numVals,num){
  var newHeight = height + Math.ceil(numVals/10)*height;
   


  if(d3.select("body").select("#rest"+num).attr("height") == height){
    d3.select("body").selectAll("svg").attr("height", newHeight);
  }else{
    d3.select("body").selectAll("svg").attr("height", height);
  }
  
}


function returnColorset(num){
  var colorsets = [ [51,255,51,238,51,153],
                    [10,255,125,180,53,4],
                    [19,229,31,130,44,100],
                    [115,220,39,220,89,220],
                    [28,244,28,244,12,36],
                    [83,224,10,127,21,21],
                    [0,145,0,242,110,157],
                    [255,97,190,97,90,97]];

  for (var i = colorsets.length; i >= 0; i--) {
    return colorsets[num%i];
  };
}



function createHeading(index){
  var margin = 20;

  var width = $(document).width();
  var height = 150;
  var stickerWidth = 400;
  var stickerHeight = 0.6*height;
  var stickerSkewHeight = 0.33*height;

  //za odmicanje
  d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", margin);

 

  var svgH = d3.select("body")
                .append("svg")
                .attr("width", width)
                .attr("height", height);

  // svgH.append("rect")
  //     .attr("width", width)
  //     .attr("height", 80)
  //     .attr("fill", "rgb(205,200,200)");

  svgH.append("polygon")
      .attr("points", ""+(width - stickerWidth)/2+","+
                      (height - stickerHeight - stickerSkewHeight)/2+","+
                      (width + stickerWidth)/2+","+
                      (height - stickerHeight - stickerSkewHeight)/2+","+
                      (width + stickerWidth)/2+","+
                      (height + stickerHeight - stickerSkewHeight)/2+","+
                      (width/2)+","+
                      (height - (height - stickerHeight - stickerSkewHeight)/2)+","+
                      (width - stickerWidth)/2+","+
                      (height + stickerHeight - stickerSkewHeight)/2+"")

        // "10,0,300,0,350,30,350,50,300,80,10,80")
      .attr("fill", "rgb(255,207,0)");

   

  svgH.append("text")
      .attr("x", width/2)
      .attr("y", 55)
      .text("Characteristic")
      .attr("text-anchor", "middle")
      .attr("font-family", "Helvetica")
      .attr("font-size", "38px")
      .attr("fill", "rgb(40,40,40)");

  svgH.append("text")
      .attr("x", width/2)
      .attr("y", 115)
      .text(index)
      .attr("text-anchor", "middle")
      .attr("font-family", "Helvetica")
      .attr("font-size", "55px")
      .attr("fill", "rgb(40,40,40)");

      d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", margin);
}


  var names = { "Germany/Berlin": "Berlin",
                "Belgium/Brussels":  "Brussels",
                "Hungary/Budapest":  "Budapest",
                "Turkey/Istanbul":  "Istanbul",
                "UK/London":   "London",
                "Spain/Madrid":  "Madrid",
                "France/Paris":  "Paris",
                "Czech_Republic/Prague":    "Prague",
                "Italy/Rome":  "Rome",
                "Austria/Vienna":  "Vienna",
                "Poland/Warsaw":  "Warsaw",
                "Indonesia/Jakarta": "Jakarta",
                "Pakistan/Karachi":  "Karachi",
                "Philippines/Manila":    "Manila",
                "India/Mumbai":  "Mumbai",
                "India/New_Delhi":  "New Delhi",
                "outh_Korea/Seoul":  "Seoul",
                "China/Shanghai":  "Shanghai",
                "Japan/Tokyo":  "Tokyo",
                "IL/Chicago":  "Chicago",
                "TX/Houston":  "Houston",
                "CA/Los_Angeles": "Los Angeles",
                "Canada/Montreal":  "Montreal",
                "NY/New_York": "New York",
                "Canada/Toronto": "Toronto",
                "Colombia/Bogota":  "Bogota",
                "Argentina/Buenos_Aires": "Buenos Aires",
                "Peru/Lima":  "Lima",
                "Mexico/Mexico_City": "Mexico City",
                "Uruguay/Montevideo": "Montevideo",
                "Brazil/Rio_de_Janeiro": "Rio de Janeiro",
                "Chile/Santiago": "Santiago",
                "Ghana/Accra": "Accra",
                "Ethiopia/Addis_Ababa": "Addis Ababa",
                "Egypt/Cairo": "Cairo",
                "South_Africa/Cape_Town":  "Cape Town",
                "Morocco/Casablanca": "Casablanca",
                "South_Africa/Johannesburg": "Johannesburg",
                "Mozambique/Maputo": "Maputo",
                "Kenya/Nairobi":  "Nairobi",
                "Australia/Adelaide":   "Adelaide",
                "Australia/Brisbane":   "Brisbane",
                "Australia/Melbourne":    "Melbourne",
                "Australia/Perth":"Perth",
                "Australia/Sydney":  "Sydney",       
                "Rest": "Rest"}

 function getFullName (shortName){
      if(names[shortName] != null){
        return names[shortName];
      } else {
        return shortName;
      }
      
}


function makeLinks(){

 for (var key in names) {
     $("body").append("<a href=http://ichart.yahoo.com/table.csv?s="+key+"&a=9&b=5&c=2010&d=6&e=7&f=2012&g=w&ignore=.csv>"+key+" - "+names3[key]+"</a><br/>");
};

 



 // "http://ichart.yahoo.com/table.csv?s=COMP&a=9&b=5&c=2010&d=6&e=7&f=2012&g=w&ignore=.csv"
}


function formatDate(date){
  var day = date.substring(8,10);
  var month = date.substring(5,7);
  var year = date.substring(0,4);
  return day+"."+month+"."+year+".";

}











































 














// createSVG(dataset, companies, dates, dateVals, colorSet1);
// createSVG(dataset, companies, dates, dateVals, colorSet2);
// createSVG(dataset, companies, dates, dateVals, colorSet3);
// createSVG(dataset, companies, dates, dateVals, colorSet4);
// createSVG(dataset, companies, dates, dateVals, colorSet5);
// createSVG(dataset, companies, dates, dateVals, colorSet6);
// createSVG(dataset, companies, dates, dateVals, colorSet8);
// createSVG(dataset, companies, dates, dateVals, colorSet9);





// //first create you SVG or select it
// var svg = d3.select("#container").append("svg");

// //then append the defs and the pattern
// svg.append("defs").append("pattern")
//     .attr("width", 5)
//     .attr("height", 5);
