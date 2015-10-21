function processCourses(courses,instances) {
	colourInc = 1;
	for (i=0;i<courses.length;i++) {
		course = courses[i];
		title = course["title"];
		link = course["web_url"];
		subtitle = course.details["excerpt"];
		if (subtitle.length > 140) {
			subtitle = subtitle.substring(0,140);
			subtitle = subtitle.substring(0,subtitle.lastIndexOf(' '));
			subtitle = subtitle + "...<a style='color: #333; text-decoration: underline; font-size: 0.9em;' href='" + link + "'>read more</a>";
		} 
		duration = course.details["length"];
		key = course["slug"];
		occurs = getCourseInstances(instances,key);
		heading = "<h2 style='font-size: 1.5em;'><a href='" + link + "'>" + title + "</a></h2><p class='courseSub'>" + subtitle + "</p>";
		icons = '<ul class="course_properties">';
		icons += '<li><img src="//static.theodi.org/assets/training/'+duration.replace(/ /g,"_")+'.png" title="'+duration+'" alt="'+duration+'"></img></li>';
		icons += '<li><img src="//static.theodi.org/assets/training/f2f.png" title="Face to face training" alt="Face to face training"></img></li>';
		icons += '</ul>';
		running = '<div class="instances"><ul>';
		for(k=0;k<occurs.length;k++) {
			ocr = occurs[k];
			if (k < 2) {
				running += '<li><span id="courseLoc">' + ocr["displayDate"] + ' <small>('+ocr["location"] + ')</small></span><a href="'+ocr["url"]+'" class="courseButton bookButton btn btn-primary">Book</a></li>';
			}
		}
		running += '</ul></div>';
		if (occurs.length < 1) {
			running = '<div class="instances">&nbsp;<br/><div class="noInstances"><a class="courseButton btn btn-primary" href="mailto:training@theodi.org?subject=Interest in ' + title + ' course">Register interest</div></div>';
		}
		block = '<li id="course" class="home-module shown"><div class="module2 module module-light module-highlight-1 module-colour-'+colourInc+' ">' + heading + icons + running + '</div></li>';
		if (occurs.length > 0) {
			$("#courses").prepend(block);
		} else {
			$("#courses").append(block);
		}
		colourInc = colourInc + 1;
		if (colourInc > 12) colourInc = 1;
	}
}

function getCourseInstances(instances,key) {
	occurs = [];
	var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
	instances.sort(function(a,b) {
		return new Date(a.details["date"]) - new Date(b.details["date"]);
	});
	for (j=0;j<instances.length;j++) {
		instance = instances[j];
		if (instance.details["course"] == key) {
			ins = [];
			ins["date"] = instance.details["date"];
			ins["location"] = instance.details["location"];
			ticketsAvailable = "true";
			if (instance.details["ticketsAvailable"]) {
				ticketsAvailable = instance.details["ticketsAvailable"];
			}
			if (instance.details["location"]) {
				if (instance.details["location"].indexOf('London') > 0 || instance.details["location"].indexOf('65 Clifton Street') > 0) {
					ins["location"] = "London";
				} else {
					parts = instance.details["location"].split(",");
					ins["location"] = parts[parts.length - 2].trim();
				}
			}
			ins["url"] = instance.details["url"];
			now = new Date();
			run = new Date(ins["date"]);
			day = run.getDate();
			suffix = "th";
			if (day == 1 || day == 21 || day == 31) {
				suffix = "st";
			} 
			if (day == 2 || day == 22) {
				suffix = "nd";
			}
			if (day == 3 || day == 23) {
				suffix = "rd";
			}
			ins["displayDate"] = day + suffix + " " + monthNames[run.getMonth()];
			// Removed the ticket availability check
			if (run > now) {
				occurs.push(ins);
			}
		}
	}
	return occurs;
}
