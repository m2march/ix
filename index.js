
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
      this.start_time = new Date()
      this.level = new Level(1)
      this.img_holders = [$("#image1"), $("#image2"),
                          $("#image3"), $("#image4")]
      this.responses = [];
      this.start();
    }

    start() {
      this.responses = [];
      for (var i = 0; i < this.level.number; i++) {
        this.img_holders[i].attr('src', "images/" + this.level.symbols[i] + ".jpg");
      }
    }

    submit(){
      var in_text = $("input").val();
      in_text = in_text.toLowerCase();
      if (in_text == this.level.symbols[this.responses.length]) {
          // Correct answer
          this.responses.push(in_text);
          if (this.responses.length == this.level.number) {
            // End game
            if (this.level.number == 4) {
              
            }
            // End of level
            this.level = new Level(this.level.number + 1);
            this.start();
          }
      } else {
        // Incorrect answer
        // TODO: END LEVEL
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
            }
            if (selected.length != i) {
                console.log("Selected items are not as many as expected");
            }
        }
        console.log("Testing ended.");
    }
});
