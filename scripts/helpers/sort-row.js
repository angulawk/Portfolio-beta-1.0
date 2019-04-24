import { sortTable, sortNumber } from "./sort-table.js";
import { arrayToSort } from "./array-to-sort.js";

export function sortRow(order, keyToCompare) {
  if (keyToCompare === "experience") {
    sortNumber(keyToCompare, arrayToSort, order);
  } else {
    sortTable(keyToCompare, arrayToSort, order);
  }
  const sortableRow = document.querySelectorAll(".sortable_row");

  for(let i = 0; i < arrayToSort.length; i++) {
    for (let j = 0; j < sortableRow.length; j++) {
      if (i === j) {
        sortableRow[j].children[0].innerHTML = arrayToSort[i].name;
        sortableRow[j].children[1].children[0].src = `images/${arrayToSort[i].image}.png`;
        sortableRow[j].children[2].innerHTML = arrayToSort[i].experienceDescription;
      }
    }
  }
}
