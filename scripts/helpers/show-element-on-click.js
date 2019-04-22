export function showElementOnClick(arrayOfLinks, content, insideElement = false) {
  for (let index = 0; index < arrayOfLinks.length; index++) {
    arrayOfLinks[0].style.transform = "scale(1.2)";
    arrayOfLinks[index].addEventListener("click", function () {
      arrayOfLinks.forEach(element => {
        element.style.transform = "scale(1)";
      });

      arrayOfLinks[index].style.transform = "scale(1.2)";
      content.forEach(element => {
        element.style.display = "none";
      });

      if (insideElement) {
        const lineInsideTimeline = document.querySelector(".inside");
        lineInsideTimeline.style.height = `${index * 65}px`;
      }
      content[index].style.display = "block";
    });
  }
}
