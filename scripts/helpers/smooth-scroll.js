export function smoothScrollElem(element) {
  window.scrollTo({
    "behavior": "smooth",
    "left": 0,
    "top": element.offsetTop - 75
  });
}
