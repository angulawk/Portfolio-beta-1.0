export function cleanClass(clickedElem) {
  if (clickedElem.classList.contains("fa-angle-up")) {
    clickedElem.classList.remove(`fa-angle-up`);
  } else if (clickedElem.classList.contains("fa-angle-down")) {
    clickedElem.classList.remove(`fa-angle-down`);
  }
}
