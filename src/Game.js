import { v4 as uuidv4 } from "uuid";
import { computeMinimumTransactions, isNetIncomeBalanced } from "./Transaction.js";

export class Game {
  constructor() {
    this.id = uuidv4();
    this.startTime = new Date();
    this.endTime = null;
    this.players = new Map();
    this.netIncome = new Map();
  }

  addPlayer(name) {
    if (this.players.has(name)) {
      return false;
    }

    this.players.set(name, {});
    return true;
  }

  buyIn(name, amount) {
    if (!this.players.has(name)) {
      return false;
    }

    this.players.set(name, amount);
    return true;
  }

  cashOut(name, amount) {
    if (!this.players.has(name)) {
      return false;
    }

    const buyIn = this.players.get(name);
    const net = amount - buyIn;
    this.netIncome.set(name, net);
    return net;
  }

  end() {
    if (!this.#isEveryoneCashedOut()) {
      console.log('Error: everyone needs to cashout!');
      return false;
    }

    if (!isNetIncomeBalanced(Array.from(this.netIncome.values()))) {
      console.log('Error: The net amount is not balanced!');
      return false;
    }

    const transfers = computeMinimumTransactions(this.netIncome);
    this.endTime = new Date();
    return transfers;
  }

  #isEveryoneCashedOut() {
    return this.netIncome.size === this.players.size;
  }
}

