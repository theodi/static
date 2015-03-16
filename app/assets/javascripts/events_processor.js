var weekday=new Array(7);
weekday[0]="Sunday";
weekday[1]="Monday";
weekday[2]="Tuesday";
weekday[3]="Wednesday";
weekday[4]="Thursday";
weekday[5]="Friday";
weekday[6]="Saturday";


function nth(d) {
  if(d>3 && d<21) return 'th'; // thanks kennebec
  switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
} 

function pad(num, size){
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

var month=new Array(12);
month[0]="January";
month[1]="February";
month[2]="March";
month[3]="April";
month[4]="May";
month[5]="June";
month[6]="July";
month[7]="August";
month[8]="September";
month[9]="October";
month[10]="November";
month[11]="December";


function processEvents(previous) {
      //Get the events
      console.log("1")
      $.getJSON( "http://contentapi.theodi.org/with_tag.json?type=events", function( data ){
       // $.getJSON( "events.json", 
       // function( data ){
          processData(data, previous);
          console.log("2")
          console.log( data );
      })
      .error(function() {
        console.log("error ");
        processData(data2, previous);
      })
}
//call a function to process each event

function processData(data, previous) {
      results=data.results;
      for(i=0; i<results.length; i++){
        event=results[i];
        start_date=event.details.start_date;
        inDate=Date.parse(start_date);
        now =Date.now();
        if(inDate < now && !previous){
          continue;
        }
        if(inDate > now && previous){
          continue;
        }
        title=event.title;
        url=event.web_url;
        end_date=event.details.end_date;
        locations=event.details.location;
        booknow=event.details.booking_url;
        event_type=event.details.event_type;
        console.log(start_date);

        addEventToPage(title, url, start_date, locations, booknow, event_type, end_date);
      }
}
// recreate the HTML block

function addEventToPage(title, url, start_date, locations, booknow, event_type, end_date){
    inDate = new Date(start_date);
    outDate = new Date(end_date);
    console.log(inDate.getDate());
    weekdays= weekday[inDate.getDay()];
    monthday= inDate.getDate() + nth(inDate.getDate());
    months= month[inDate.getMonth()];
    years= inDate.getYear() +1900;
    start_time= pad(inDate.getHours(),2) +':' + pad(inDate.getMinutes(),2);
    end_time= pad(outDate.getHours(),2) +':' + pad(outDate.getMinutes(),2);
    html = '<tr class="'+event_type+'">';
    html += '<td class="datebox">';
    html += '<p class="day">' + weekdays + '</p>';
    html += '<p class="date">' + monthday + '</p>';
    html += '<p class="month">' + months+ ' '+years+'</p>';
    html += '</td>';
    html += '<td class="event_details">';
    html += '<b class="title">' + title + '</b>';
    html += '<p class="time">' + start_time + ' - '+end_time+'</p>';
    html += '<small class="location">' + locations + '</small>';
    html += '<br/>';
    html += '<a class="book" href="'+booknow +'" class="book_url">BOOK NOW</a>';
    html += '</td>';
    html += '</tr>';
    html += '<tr>';
    html += '</tr>';    
    $('#event_table').append(html);
}
