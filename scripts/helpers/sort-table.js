export function sortTable(keyToCompare, arrayToSort, comparisonSign) {
  arrayToSort.sort((a, b) => {
    return comparisonSign === "asc" ?
      (a[keyToCompare] > b[keyToCompare]) ? 1 : ((b[keyToCompare] > a[keyToCompare]) ? -1 : 0) :
      (a[keyToCompare] < b[keyToCompare]) ? 1 : ((b[keyToCompare] < a[keyToCompare]) ? -1 : 0);
  });
}

export function sortNumber(keyToCompare, arrayToSort, comparisonSign) {
  arrayToSort.sort(function (a, b) {
    return comparisonSign === "asc" ?
      parseFloat(a[keyToCompare]) - parseFloat(b[keyToCompare]) :
      parseFloat(b[keyToCompare]) - parseFloat(a[keyToCompare]);
  });
}
