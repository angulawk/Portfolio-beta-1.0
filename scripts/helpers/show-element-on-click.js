export function showElementOnClick(arrayOfLinks, content, insideElement = false) {
  for (let index = 0; index < arrayOfLinks.length; index++) {
    arrayOfLinks[index].addEventListener("click", function () {
      content.forEach(function (element) {
        element.style.display = "none";
      });

      if (insideElement) {
        const lineInsideTimeline = document.querySelector(".inside");
        lineInsideTimeline.style.width = `${(index + 1) * 20}%`;
      }
      content[index].style.display = "block";
    });
  }
}