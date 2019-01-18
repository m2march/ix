// http://callofduty.wikia.com/wiki/IX?file=IX_Layout_BO4.jpg
var locations = [
    "Odin Altar",
    "Odin Temple Entrance",
    "Cauldron",
    "Odin-Zeus Temple Entrance",
    "Bath House",
    "Zeus Temple Entrance",
    "Zeus Altar",
    "Odin Tunnel",
    "Crypts",
    "Cursed Room",
    "The Pit",
    "Temple",
    "Flooded Crypt",
    "Fallen Hero",
    "Collapsed Tunnel",
    "Danu-Ra Temple Entrance",
    "Danu Tunnel",
    "Ra Altar Room",
    "Danu Altar Room",
    "Ra Temple Entrance",
    "Ra Burial Chamber",
    "Danu Arboretum",
    "Danu Temple Entrance",
    "Odin-Zeus Drawbridge",
    "Danu-Ra Stonebridge",
    "Arena",
    "Danu Tower",
];

var images = [
    'Arena.jpg',
    'Danu_Altar_Room.jpg',
    'Odin-Zeus_Drawbridge.jpg',
    'Flooded_Crypt.png',
    'Odin-Zeus_Temple_Entrance.jpg',
    'Ra_Burial_Chamber.png',
    'The_Pit.jpg',
    'Danu_Tunnel.jpg'
];

var bull_locations = [];

function img_to_name(s) {
    var x = s.split('.')[0];
    var nx = x.replace('_', ' ');
    while (x != nx) {
        x = nx;
        nx = x.replace('_', ' ');
    }
    return nx;
}

for (var i = 0; i < images.length; i++) {
    bull_locations.push(img_to_name(images[i]));
}

class Area {
    constructor(name) {
        this.name = name;
        this.is_bull_loc = bull_locations.indexOf(name) >= 0;
        this.img_src = 'images/' + images.find(x => img_to_name(x) == name);
    }

    as_button() {
        return $("<button type='button' class='btn btn-info'>" + this.name + "</button>");
    }
}

var all_areas = []

for (var i = 0; i < locations.length; i++) {
    all_areas.push(new Area(locations[i], 
                        bull_locations.indexOf(locations[i]) >= 0))
}


class Game {
    constructor() {
        this.canvas = $("#img")
        this.modal = $(".modal")
        this.title = $("#title")

        this.done_areas = 0;
        this.make_btns();
        this.canvas.on('click', this.canvas_callback.bind(this));
    }

    make_btns() {
        for (var i = 0; i < all_areas.length; i++) {
            var btn_div = $("#buttons")
            var area = all_areas[i];
            var x = area.as_button();
            btn_div.append(x);
            if (area.is_bull_loc) {
                x.on('click', this.btn_callback.bind(this, x, area))
            }
        }
    }

    btn_callback(btn, area) {
        this.draw_image(area.img_src);
        this.modal.css("display", "block");
        this.title.text(area.name);
        btn.css("background-color", "green");
        btn.css("border-color", "green");
        btn.prop("disabled", true);
        this.done_areas++;
    }

    draw_image(src) {
        var bg = new Image();
        bg.src = src;

        var ctx = this.canvas[0].getContext("2d")
        bg.onload = function() { 
            ctx.drawImage(bg, 0, 0, 1020, 600)
        }
    }

    canvas_callback(event) {
        var ctx = this.canvas[0].getContext("2d")
        ctx.fillStyle = 'green';
        ctx.fillRect(event.offsetX - 20, event.offsetY - 20, 40, 40)
        setTimeout(this.close_modal.bind(this), 1500);
    }

    close_modal() {
        this.modal.css("display", "none");
        if (this.done_areas == bull_locations.length) {
            alert('You won!');
        }
    }
}
