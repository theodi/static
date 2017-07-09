String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

function populatePeopleBlock(blockid,people,badge) {
        for (i=0;i<people.length;i++) {
                getPerson(blockid,people[i],badge);
        }
}

function getPerson(blockid,person,badge) {
        $.getJSON( "//contentapi.theodi.org/"+person.name+".json")
                .done(function(data) {
                        name = data.title;
                        role = person.specialism;
                        if (!person.specialism) role = data.details.role;
			image_src="//static.theodi.org/assets/training/avatar.gif";
                        if (data.details.image) image_src = data.details.image.versions.square;
                        drawPerson(blockid,name,role,image_src,badge);
                })
                .fail(function() {
                        image_src="//static.theodi.org/assets/training/avatar.gif";
                        name = person.name.replace("-"," ");
                        name = name.capitalize();
                        role = person.specialism;
                        drawPerson(blockid,name,role,image_src,badge);
                });
}

function drawPerson(blockid,name,role,image_src,badge) {
        bit = '<li class="shown" style="width: 23%; min-width: 270px; display: inline-block; vertical-align: top; margin-right: 15px; text-align: left;"><div class="module module-light module-colour-8">';
        bit += '<img alt="'+name+'" src="'+image_src+'" style="width: 238px; height: 225px">';
        if (badge) {
             bit += '<img alt="Badge" src="'+badge+'"/>';
        }
        bit += '<h1 style="font-size: 24px;">'+name+'</h1>';
        bit += '<p style="height: 24px; font-size: 15px; font-weight: 300;">'+role+'</p>';
        bit += '</div></li>';
        $('#' + blockid).append(bit);
}

