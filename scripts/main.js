import { showElementOnClick } from "./helpers/show-element-on-click.js";
import { sortTable, sortNumber } from "./helpers/sort-table.js";
import { arrayToSort } from "./helpers/array-to-sort.js";

(function () {
  //Toggle navigation

  const hamburger = document.querySelector(".hamburger");
  const links = document.querySelector(".links");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("is-active");
    links.classList.toggle("active");
  });

  //Website hover scroll

  let imageHeight;
  const smallViewArray = document.querySelectorAll(".small_view");

  for (let index = 0; index < smallViewArray.length; index++) {
    let smallViewHeight = smallViewArray[index].clientHeight;
    smallViewArray[index].addEventListener("mouseover", function () {
      imageHeight = parseInt(this.childNodes[1].height);
      const hiddenImageHeight = imageHeight - smallViewHeight;
      imageHeight = `-${hiddenImageHeight}px`;
      this.childNodes[1].style.top = imageHeight;
    });

    smallViewArray[index].addEventListener("mouseleave", function () {
      this.childNodes[1].style.top = "0px";
    });
  }

  //Open info show
  const moreInfoArray = document.querySelectorAll(".more_info");

  for (let index = 0; index < moreInfoArray.length; index++) {
    moreInfoArray[index].addEventListener("click", function () {
      const boxInfo = this.childNodes[3];
      const headerContent = boxInfo.childNodes[1];
      boxInfo.classList.toggle("show_box_info");

      const isShowBoxInfoVisible = boxInfo.classList.length === 2;
      isShowBoxInfoVisible
        ? (boxInfo.style.height = `${headerContent.clientHeight}px`)
        : (boxInfo.style.height = "0px");
    });
  }

  //Fixed menu

  window.addEventListener("scroll", function (e) {
    const menu = document.querySelector("#menu");
    if (window.scrollY > menu.clientHeight) {
      menu.classList.add("fixed");
    } else {
      menu.classList.remove("fixed");
    }
  });

  //Active link

  const linksList = document.querySelectorAll(".links li a");

  linksList.forEach(function (item) {
    item.addEventListener("click", function () {
      linksList.forEach(function (element) {
        element.classList.remove("active_link");
      });
      item.classList.add("active_link");
    });
  });

  //Timeline animation

  const timelineDots = document.querySelectorAll(".dot");
  const modalContent = document.querySelectorAll(".modal_content");

  showElementOnClick(timelineDots, modalContent, true);

  //Workplace click

  const workplaceName = document.querySelectorAll(".workplace_name");
  const workplaceDescription = document.querySelectorAll(".workplace_description");

  showElementOnClick(workplaceName, workplaceDescription);

  const experience = document.querySelector(".experience");
  const technology = document.querySelector(".technology");
  const experienceArrowIcon = document.querySelector(".experience_sort .sort_direction i");
  const technologyArrowIcon = document.querySelector(".technology_sort .sort_direction i");
  var comparisonSign = "asc";

  function sortNameColumn(arrayToSort, experienceTime, technologyName, comparisonSign) {
    sortTable("name", arrayToSort, comparisonSign);
    for (let i = 0; i < arrayToSort.length; i++) {
      for (let j = 0; j < experienceTime.length; j++) {
        if (j === i) {
          experienceTime[j].innerHTML = `${arrayToSort[i].experience} years`;
        }
      }

      for (let k = 0; k < technologyName.length; k++) {
        if (k === i) {
          technologyName[k].src = `images/${arrayToSort[i].name}.png`;

          if (comparisonSign === "asc") {
            technologyArrowIcon.classList.remove("fa-angle-down");
            technologyArrowIcon.classList.add("fa-angle-up");
          } else {
            technologyArrowIcon.classList.remove("fa-angle-up");
            technologyArrowIcon.classList.add("fa-angle-down");
          }
        }
      }
    }
  }

  function sortExperienceColumn(arrayToSort, experienceTime, technologyName, comparisonSign) {
    sortNumber("experience", arrayToSort, comparisonSign);

    for (let i = 0; i < arrayToSort.length; i++) {
      for (let j = 0; j < experienceTime.length; j++) {
        if (j === i) {
          experienceTime[j].innerHTML = `${arrayToSort[i].experience} years`;

          if (comparisonSign === "asc") {
            experienceArrowIcon.classList.remove("fa-angle-down");
            experienceArrowIcon.classList.add("fa-angle-up");
          } else {
            experienceArrowIcon.classList.remove("fa-angle-up");
            experienceArrowIcon.classList.add("fa-angle-down");
          }
        }
      }

      for (let k = 0; k < technologyName.length; k++) {
        if (k === i) {
          technologyName[k].src = `images/${arrayToSort[i].name}.png`;
        }
      }
    }
  }

  const experienceTime = document.querySelectorAll(".experience_time");
  const technologyName = document.querySelectorAll(".technology_name");

  async function sortArrayOnClick(sortArrFunction, keyToCompare) {
    if (comparisonSign === "asc") {
      await sortArrFunction(arrayToSort, experienceTime, technologyName, "asc", keyToCompare);
      comparisonSign = "desc";
    } else {
      await sortArrFunction(arrayToSort, experienceTime, technologyName, "desc", keyToCompare);
      comparisonSign = "asc";
    }
  }

  experience.addEventListener("click", () => {
    sortArrayOnClick(sortExperienceColumn, "experience");
  });

  technology.addEventListener("click", () => {
    sortArrayOnClick(sortNameColumn, "name");
  });
})();
