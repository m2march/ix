
function random_items(k, items) {
    var selected = [];
    for (var i = 0; i < k; i++) {
        var n_item = null;
        while (n_item == null || selected.find(n_item) >= 0) {
            n_item = items[Math.floor(Math.random() * items.length)];
        }
        selected.append(n_item);
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
    constructor() {}
};


$(document).ready(function() {
    console.log("Loaded");
});

console.log('log');
