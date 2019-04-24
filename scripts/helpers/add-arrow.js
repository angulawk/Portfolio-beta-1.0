import { cleanClass } from "./clean-class.js";
import { sortRow } from "./sort-row.js";

export function addArrow(sortedCol, nextCol, sortedColName, order) {
  let direction = order === "asc" ? "up" : "down";

  cleanClass(sortedCol);
  cleanClass(nextCol);

  sortedCol.classList.add(`fa-angle-${direction}`);
  nextCol.classList.remove(`fa-angle-${direction}`);

  sortRow(order, sortedColName);
}
