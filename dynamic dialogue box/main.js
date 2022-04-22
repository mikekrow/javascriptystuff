let game = {
  FPS: 30,
  c: "",
  ctx: "",
  engine: "",
  inp: document.getElementById("inputbox"),

  init() {
    let canvas = document.getElementById("mainCanvas");
    this.c = canvas;
    this.c.width = 240;
    this.c.height = 320;
    this.ctx = canvas.getContext("2d");
  },

  render() {
    this.ctx.clearRect(0, 0, this.c.width, this.c.height);

    let text = this.inp.value;
    let textArray = text.split(" ");

    let renderLines = [];
    let lineTotal = 0;
    let lineToAdd = "";
    let longestLine = 0;

    for (var w = 0; w < textArray.length; ++w) {
      let word = textArray[w];
      let wordLen = word.length * 8;
      wordLen += 8;

      if (lineTotal + wordLen > 130) {
        renderLines.push(lineToAdd);

        if (lineToAdd.length > longestLine) {
          longestLine = lineToAdd.length;
        }

        lineToAdd = word + " ";

        lineTotal = wordLen;
      } else {
        lineTotal += wordLen;
        lineToAdd += word + " ";
      }

      if (w === textArray.length - 1) {
        renderLines.push(lineToAdd);
        if (lineToAdd.length > longestLine) {
          longestLine = lineToAdd.length;
        }
      }
    }

    let x = 50;
    let y = 100;

    let width = longestLine * 8;

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(x - 5, y - 13, width, renderLines.length * 16);

    for (var r in renderLines) {
      this.ctx.font = "16px Fixedsys";
      this.ctx.fillStyle = "white";

      this.ctx.fillText(renderLines[r], x, y);

      y += 16;
    }
  },

  main() {
    game.render();
  },
};

game.init();

game.engine = setInterval(game.main, 1000 / game.FPS);
