
function random_items(k, items) {

  // Selects `k` random items without repeats from `items`

    var selected = [];
    for (var i = 0; i < k; i++) {
        var n_item = null;
        while (n_item == null || selected.indexOf(n_item) >= 0) {
            n_item = items[Math.floor(Math.random() * items.length)];
        }
        selected.push(n_item);
    }
    return selected;
}

var symbols = [
    "tiger",
    "gladiator",
    "fire",
    "water",
    "electric",
    "poison",
    "brawler"
]

class Level {
    constructor(number) {
        this.number = number;
        this.symbols = random_items(number, symbols);
    }
};

class Memtest {
    constructor() {
      this.IMG_INTERVAL = 1000; //ms

      this.img_holders = [$("#image1"), $("#image2"),
                          $("#image3"), $("#image4")]
      this.top_text = $("#number_field")
      this.start_time = new Date()
      this.new_game();
      this.playing = true;
    }

    new_game() {
      this.level = new Level(1)
      this.responses = [];

      for (var i = 0; i < this.img_holders.length; i++) {
        this.img_holders[i].hide();
      }
      this.start_level();
      this.playing = true;
      $("#error-msg").text("")
      $("input").attr("disabled", false);
    }

    start_level() {
      this.top_text.text("Symbols in this level: " + this.level.number);
      this.responses = [];
      for (var i = 0; i < this.level.number; i++) {
        setTimeout(this.set_image.bind(this, i), i * this.IMG_INTERVAL);
        setTimeout(this.unset_image.bind(this, i), (i + 1) * this.IMG_INTERVAL);
      }
    }

    set_image(x) {
      this.img_holders[x].attr('src', "images/" + this.level.symbols[x] + ".jpg");
      this.img_holders[x].show();
    }

    unset_image(x){
      this.img_holders[x].hide();
    }

    submit(){
      if (!this.playing) {
          return;
      }
      var in_text = $("input").val();
      in_text = in_text.toLowerCase();
      if (in_text == this.level.symbols[this.responses.length]) {
          // Correct answer
          this.responses.push(in_text);
          if (this.responses.length == this.level.number) {
            // End game
            if (this.level.number == 4) {
                alert("You won!")
                this.new_game();
            } else {
                // End of level
                this.level = new Level(this.level.number + 1);
                this.start_level();
            }
          }
      } else {
          this.playing = false;
          $("#error-msg").text("Correct answer is: " + 
              this.level.symbols[this.responses.length])
          this.set_image(this.responses.length)
          $("input").attr("disabled", true);
      }
      $("input").val("");
    }
};

var TEST = true;

$(document).ready(function() {
    console.log("Loaded");

    var memtest = new Memtest();

    $(".btn-success").click(memtest.submit.bind(memtest));

    $("input").keyup(function(event) {
      if (event.keyCode == 13) {
        memtest.submit();
      }
    });

    $("#reset-btn").click(memtest.new_game.bind(memtest));

    if (TEST) {
        console.log("Starting tests...");
        var items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        for (var i = 0; i < 10; i++) {
            var selected = random_items(i, items);
            for (var j = 0; j < selected.length; j++) {
                var x = selected[j];
                if (items.indexOf(x) < 0) {
                    console.log("" + x + " is not a valid value");
                }
                if (selected.indexOf(x) < j) {
                    console.log("" + x + " is repeated");
                }
            }
            if (selected.length != i) {
                console.log("Selected items are not as many as expected");
            }
        }
        console.log("Testing ended.");
    }
});
