const topSort = (graph: Map<number, Set<number>>): number[] => {
  const order: number[] = [];
  const visited = new Set<number>();

  const dfs = (pageNum: number, follows: Set<number>) => {
    visited.add(pageNum);
    for (const dep of follows) {
      if (!visited.has(dep)) {
        dfs(dep, graph.get(dep) ?? new Set());
      }
    }
    order.unshift(pageNum);
  };

  for (const [pageNum, follows] of graph) {
    if (!visited.has(pageNum)) {
      dfs(pageNum, follows);
    }
  }

  return order;
};

export function analyzeUpdates(manifest: {
  rules: number[][];
  updates: number[][];
}): [number, number] {
  const graph = new Map<number, Set<number>>();
  for (const rule of manifest.rules) {
    const [before, after] = rule;
    const deps = graph.get(before);
    if (deps instanceof Set) {
      deps.add(after);
    } else {
      graph.set(before, new Set([after]));
    }
  }

  let sumCorrect = 0;
  let sumIncorrect = 0;

  manifest.updates.forEach((update) => {
    // rules for numbers not present in update should be ignored for that update
    const relevantRules = new Map<number, Set<number>>();
    Array.from(graph.keys())
      .filter((k) => update.includes(k))
      .forEach((k) => {
        relevantRules.set(k, graph.get(k) ?? new Set());
      });

    const order = topSort(relevantRules);

    // right order?
    if (
      update
        .map((n) => order.findIndex((x) => x === n))
        .every((oi, i, arr) => {
          if (i > 0) {
            return oi > arr[i - 1];
          }

          return true;
        })
    ) {
      sumCorrect += update[(update.length - 1) / 2];
    } else {
      const coded = update.map((n) => order.findIndex((x) => x === n));

      // Assumes page numbers appear once in an update; doesn't handle multiple appearances
      const reordered = update.toSorted((a, b) => {
        const aInd = coded[update.indexOf(a)];
        const bInd = coded[update.indexOf(b)];
        return aInd - bInd;
      });

      sumIncorrect += reordered[(reordered.length - 1) / 2];
    }
  });

  return [sumCorrect, sumIncorrect];
}
