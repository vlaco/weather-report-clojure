var startY = 2001;
for(i=1; i<=31; i++){
 $('<option>').val(i).text(i).appendTo('#startDay');
 $('<option>').val(i).text(i).appendTo('#endDay');
 if(i<=12){
  $('<option>').val(i).text(i).appendTo('#startMonth');
  $('<option>').val(i).text(i).appendTo('#endMonth');
  $('<option>').val(startY+i).text(startY+i).appendTo('#startYear');
  $('<option>').val(startY+i).text(startY+i).appendTo('#endYear');
}
}