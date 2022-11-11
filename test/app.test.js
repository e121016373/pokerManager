import { expect } from "chai";
import { Game } from "../src/Game.js";
import { PLAYER_NAME } from "./constants.js";

describe("Testing the Game Functions", () => {
  it("1. Start the game and add players", (done) => {
    const game = new Game();
    PLAYER_NAME.forEach((name) => game.addPlayer(name));

    expect(game.players.size).to.equal(PLAYER_NAME.length);
    expect(game.players.get("Tom Dwan")).to.deep.equal({});
    expect(game.players.get("Tom Wan")).to.be.undefined;

    done();
  });

  it("2. All players should have buy in", (done) => {
    const game = new Game();
    PLAYER_NAME.forEach((name) => {
      game.addPlayer(name);
      game.buyIn(name, 1000);
    });

    PLAYER_NAME.forEach((name) => {
      expect(game.players.get(name)).to.equal(1000);
    });
    expect(game.players.get("Tom Wan")).to.be.undefined;

    done();
  });

  it("3. All players can cash out", (done) => {
    const game = new Game();
    game.addPlayer("Tom Dwan");
    game.buyIn("Tom Dwan", 1000);
    game.cashOut("Tom Dwan", 700);

    expect(game.netIncome.get("Tom Dwan")).to.equal(-300);

    done();
  });
});

describe("Testing the Minimum Transaction Logic", () => {
  it("1. Should not end the game if not everyone cashed out", (done) => {
    const game = new Game();
    PLAYER_NAME.forEach((name) => {
      game.addPlayer(name);
      game.buyIn(name, 500);
    });

    expect(game.end()).to.be.false;

    done();
  });

  it("2. Should not end the game if net income is not balanced", (done) => {
    const game = new Game();
    PLAYER_NAME.forEach((name) => {
      game.addPlayer(name);
      game.buyIn(name, 500);
      game.cashOut(name, 500);
    });
    game.cashOut("Tom Dwan", 1);

    expect(game.end()).to.be.false;

    done();
  });

  it("3. Should be able end the game if everyone cashed out", (done) => {
    const game = new Game();
    PLAYER_NAME.forEach((name) => {
      game.addPlayer(name);
      game.buyIn(name, 500);
      game.cashOut(name, 500);
    });

    expect(game.end()).to.have.lengthOf(0);

    done();
  });

  it("4. Valid Transactions", (done) => {
    const game = new Game();
    game.addPlayer("Tom Dwan");
    game.buyIn("Tom Dwan", 500);
    game.cashOut("Tom Dwan", 2000);

    game.addPlayer("Phil Ivey");
    game.buyIn("Phil Ivey", 2000);
    game.cashOut("Phil Ivey", 1175);

    game.addPlayer("John Doe");
    game.buyIn("John Doe", 1000);
    game.cashOut("John Doe", 680);

    game.addPlayer("Elon Musk");
    game.buyIn("Elon Musk", 2000);
    game.cashOut("Elon Musk", 1645);

    expect(game.end()).to.have.lengthOf(3);

    done();
  });

  it("5. Valid Transactions", (done) => {
    const game = new Game();
    game.addPlayer("Tom Dwan");
    game.buyIn("Tom Dwan", 500);
    game.cashOut("Tom Dwan", 1000);

    game.addPlayer("Phil Ivey");
    game.buyIn("Phil Ivey", 500);
    game.cashOut("Phil Ivey", 500);

    game.addPlayer("John Doe");
    game.buyIn("John Doe", 1000);
    game.cashOut("John Doe", 1500);

    game.addPlayer("Elon Musk");
    game.buyIn("Elon Musk", 1000);
    game.cashOut("Elon Musk", 0);

    expect(game.end()).to.have.lengthOf(2);

    done();
  });

  it("6. Valid Transactions", (done) => {
    const game = new Game();
    game.addPlayer("Tom Dwan");
    game.buyIn("Tom Dwan", 500);
    game.cashOut("Tom Dwan", 1250);

    game.addPlayer("Phil Ivey");
    game.buyIn("Phil Ivey", 500);
    game.cashOut("Phil Ivey", 750);

    game.addPlayer("John Doe");
    game.buyIn("John Doe", 1000);
    game.cashOut("John Doe", 800);

    game.addPlayer("Elon Musk");
    game.buyIn("Elon Musk", 1000);
    game.cashOut("Elon Musk", 200);

    expect(game.end()).to.have.lengthOf(3);

    done();
  });

  it("7. Valid Transactions", (done) => {
    const game = new Game();
    game.addPlayer("Tom Dwan");
    game.buyIn("Tom Dwan", 500);
    game.cashOut("Tom Dwan", 559);

    game.addPlayer("Phil Ivey");
    game.buyIn("Phil Ivey", 500);
    game.cashOut("Phil Ivey", 432);

    game.addPlayer("John Doe");
    game.buyIn("John Doe", 1000);
    game.cashOut("John Doe", 1204);

    game.addPlayer("Elon Musk");
    game.buyIn("Elon Musk", 1000);
    game.cashOut("Elon Musk", 792);

    game.addPlayer("Jeff Bezos");
    game.buyIn("Jeff Bezos", 1000);
    game.cashOut("Jeff Bezos", 1013);

    expect(game.end()).to.have.lengthOf(4);

    done();
  });

  it("7. Valid Transactions", (done) => {
    const game = new Game();
    game.addPlayer("Eddie");
    game.addPlayer("Elaine");
    game.addPlayer("Charles");
    game.addPlayer("Bill");
    game.addPlayer("Kyle Wang");
    game.addPlayer("Kyle Lu");
    game.addPlayer("Jay");
    game.addPlayer("Joanne");
    game.addPlayer("Ray");
    game.addPlayer("Snap");
    game.addPlayer("Don");

    game.buyIn("Eddie", 2500);
    game.buyIn("Elaine", 1000);
    game.buyIn("Charles", 1500);
    game.buyIn("Bill", 500);
    game.buyIn("Kyle Wang", 500);
    game.buyIn("Kyle Lu", 2500);
    game.buyIn("Jay", 500);
    game.buyIn("Joanne", 1500);
    game.buyIn("Ray", 500);
    game.buyIn("Snap", 500);
    game.buyIn("Don", 500);
    
    game.cashOut("Eddie", 1405);
    game.cashOut("Elaine", 0);
    game.cashOut("Charles", 1400);
    game.cashOut("Bill", 1061);
    game.cashOut("Kyle Wang", 3131);
    game.cashOut("Kyle Lu", 1065);
    game.cashOut("Jay", 0);
    game.cashOut("Joanne", 0);
    game.cashOut("Ray", 1876);
    game.cashOut("Snap", 1076);
    game.cashOut("Don", 986);

    const transactions = game.end();
    expect(transactions).to.have.lengthOf(10);

    done();
  });
});
