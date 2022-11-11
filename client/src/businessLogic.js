import { MinHeap, MaxHeap } from "@datastructures-js/heap";

const isEveryoneCashedOut = (players) => {
  return players.every((player) => player.name !== "" && player.buyIn !== 0);
};

const computeNetBalance = (netIncome) => {
  return netIncome.reduce((prev, curr) => curr.net + prev, 0);
};

const computeMinimumTransactions = (playersNetIncome) => {
  if (!playersNetIncome || !playersNetIncome.length) return [];

  const maxHeap = new MaxHeap((data) => data.net);
  const minHeap = new MinHeap((data) => data.net);
  playersNetIncome.forEach((income) => {
    maxHeap.insert(income);
    minHeap.insert(income);
  });

  const transactions = [];
  while (maxHeap.root().net !== 0 || minHeap.root().net !== 0) {
    const min = minHeap.extractRoot();
    const max = maxHeap.extractRoot();
    const payment = Math.min(Math.abs(max.net), Math.abs(min.net));
    const transaction = [min.name, max.name, payment];
    transactions.push(transaction);

    max.net -= payment;
    min.net += payment;
    if (max.net !== 0) maxHeap.insert(max);
    if (min.net !== 0) minHeap.insert(min);
  }

  return transactions;
};

export { computeMinimumTransactions, computeNetBalance, isEveryoneCashedOut };
