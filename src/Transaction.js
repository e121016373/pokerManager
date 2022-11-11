import {
  MinHeap,
  MaxHeap,
} from '@datastructures-js/heap';

const computeMinimumTransactions = (playersNetIncome) => {
  const netIncome = Array.from(playersNetIncome.entries()).map(
    ([name, amount]) => ({ name, net: amount })
  );

  const maxHeap = new MaxHeap((data) => data.net);
  const minHeap = new MinHeap((data) => data.net);
  netIncome.forEach(income => {
    maxHeap.insert(income);
    minHeap.insert(income);
  })

  const transactions = [];
  while (maxHeap.root().net !== 0 || minHeap.root().net !== 0) {
    const min = minHeap.extractRoot();
    const max = maxHeap.extractRoot();
    const payment = Math.min(
      Math.abs(max.net),
      Math.abs(min.net)
    );
    const transaction = [min.name, max.name, payment];
    transactions.push(transaction);
    
    max.net -= payment;
    min.net += payment;
    if (max.net !== 0) maxHeap.insert(max);
    if (min.net !== 0) minHeap.insert(min);
  }
  
  return transactions;
};

const isNetIncomeBalanced = (balances) => {
  const net = balances.reduce((prev, curr) => curr + prev, 0);
  if (net === 0) return true;
  else {
    console.log('The net amount is not balanced: ', net);
    return false;
  }
};

export { computeMinimumTransactions, isNetIncomeBalanced };
