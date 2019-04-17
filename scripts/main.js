import { showElementOnClick } from "./helpers/show-element-on-click.js";
import { sortTable, sortNumber } from "./helpers/sort-table.js";
import { arrayToSort } from "./helpers/array-to-sort.js";
import { tableHead } from "./helpers/table-head.js"

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

//Create table

function tableCreate() {
  let body = document.getElementsByTagName("body")[0];
  let table = document.createElement("table");
  table.style.width = "100%";
  table.setAttribute("border", "1");
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");
  for (let i = 0; i < 3; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < 2; j++) {
      if (i == 2 && j == 1) {
        break
      } else {
        let td = document.createElement("td");
        td.appendChild(document.createTextNode("\u0020"))
        i == 1 && j == 1 ? td.setAttribute("rowSpan", "2") : null;
        tr.appendChild(td)
      }
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  body.appendChild(table)
}
tableCreate();

  //Sort array

  let order = "desc";
  const sortDirectionIcon = document.querySelector(".sort_direction_icon");
  const sortableRow = document.querySelectorAll(".sortable_row");

  const technologyNameSort = document.querySelector(".technology_name_sort .sort_direction_icon");
  const experienceSort = document.querySelector(".experience_sort .sort_direction_icon");

  const technologyName = document.querySelector(".technology_name");
  const experience = document.querySelector(".experience");
  let direction = order === "asc" ? "up" : "down";
  sortRow(order, "name");

  function sortRow(order, keyToCompare) {
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
          sortableRow[j].children[1].children[0].src = `images/${arrayToSort[i].name}.png`;
          sortableRow[j].children[2].innerHTML = `${arrayToSort[i].experience} years`;
        }
      }
    }
  }

  function cleanClass(clickedElem) {
    if (clickedElem.classList.contains("fa-angle-up")) {
      clickedElem.classList.remove(`fa-angle-up`);
    } else if (clickedElem.classList.contains("fa-angle-down")) {
      clickedElem.classList.remove(`fa-angle-down`);
    }
  }

  technologyName.addEventListener("click", () => {
    order = (order === "asc") ? order = "desc" : order = "asc";
    let direction = order === "asc" ? "up" : "down";

    cleanClass(technologyNameSort);
    cleanClass(experienceSort);

    technologyNameSort.classList.add(`fa-angle-${direction}`);
    experienceSort.classList.remove(`fa-angle-${direction}`);

    sortRow(order, "name");
  });

  experience.addEventListener("click", () => {
    order = (order === "asc") ? order = "desc" : order = "asc";
    let direction = order === "asc" ? "up" : "down";

    cleanClass(technologyNameSort);
    cleanClass(experienceSort);

    experienceSort.classList.add(`fa-angle-${direction}`);
    technologyNameSort.classList.remove(`fa-angle-${direction}`);

    sortRow(order, "experience");
  });

  //Show contact details
  const openContactBoxBtn = document.querySelector(".open_contact_box");
  const envelopeBox = document.querySelector(".envelope_box");
  const envelope = document.querySelector(".envelope");
  const envelopeTop = document.querySelector(".envelope_top");
  const closeEnvelope = document.querySelector(".fa-window-close");

  openContactBoxBtn.addEventListener("click", () => {
    envelopeBox.classList.remove("hidden_element");
    envelopeBox.classList.add("visible_element");

    envelope.classList.remove("show_envelope_bottom");
    envelope.classList.add("hide_envelope_bottom");

    envelopeTop.classList.remove("hide_envelope_top");
    envelopeTop.classList.add("show_envelope_top");

    openContactBoxBtn.style.opacity = "0";
  });

  closeEnvelope.addEventListener("click", () => {
    envelopeBox.classList.add("hidden_element");
    envelopeBox.classList.remove("visible_element");

    envelope.classList.add("show_envelope_bottom");
    envelope.classList.remove("hide_envelope_bottom");

    envelopeTop.classList.add("hide_envelope_top");
    envelopeTop.classList.remove("show_envelope_top");

    setTimeout(() => {
      openContactBoxBtn.style.opacity = "1";
    }, 5000);
  });
})();
