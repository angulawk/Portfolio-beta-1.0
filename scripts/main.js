import { showElementOnClick } from "./helpers/show-element-on-click.js";
import { sortTable, sortNumber } from "./helpers/sort-table.js";
import { arrayToSort, tableHead } from "./helpers/array-to-sort.js";

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
    moreInfoArray[index].addEventListener("click", function() {
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
    // if (window.scrollY > (menu.clientHeight / 2)) {
      menu.classList.add("fixed");
      // } else {
      //   menu.classList.remove("fixed");
      // }
  });

  //Active link

  const linksList = document.querySelectorAll(".links li a");

  linksList.forEach(item => {
    item.addEventListener("click", function () {
      linksList.forEach(element => {
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
  let table = document.querySelector("#technology-stack-table");
  table.setAttribute("border", "1");
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");
  let headingRow = document.createElement("tr");

  for(let i = 0; i < tableHead.length; i++) {
    thead.appendChild(headingRow);
    let th = document.createElement("th");
    th.innerHTML = tableHead[i].title;
    th.classList.add(tableHead[i].class)
    headingRow.appendChild(th);

    if(tableHead[i].title === "Name") {
      let a = document.createElement("a");
      th.appendChild(a);
      let i = document.createElement("i");
      i.classList.add("fa");
      i.classList.add("sort_direction_icon");
      i.classList.add("fa-angle-down");
      a.appendChild(i);
    }

    if(tableHead[i].title === "Experience") {
      let a = document.createElement("a");
      th.appendChild(a);
      let i = document.createElement("i");
      i.classList.add("fa");
      i.classList.add("sort_direction_icon");
      a.appendChild(i);
    }
  }

  for (let i = 0; i < arrayToSort.length; i++) {
    let tr = document.createElement("tr");
    tbody.appendChild(tr);
    tr.classList.add("sortable_row");

    for (let key in arrayToSort[i]) {
      if (key === "name") {
        let technologyNameDesc = document.createElement("td");
        technologyNameDesc.innerHTML = arrayToSort[i].name;
        technologyNameDesc.classList.add("technology_name_desc");

        tr.appendChild(technologyNameDesc);
      } else if (key === "image") {
        let imageData = document.createElement("td");
        let img = document.createElement("img");
        img.src = `images/${arrayToSort[i].name}.png`;
        imageData.appendChild(img);

        tr.appendChild(imageData);
      } else {
        let experienceTime = document.createElement("td");
        experienceTime.innerHTML = arrayToSort[i].experience;
        experienceTime.classList.add("experience_time");

        tr.appendChild(experienceTime);

      }
    }
  }
  table.appendChild(thead);
  table.appendChild(tbody);
}
tableCreate();

  //Sort array

  let order = "desc";
  const sortDirectionIcon = document.querySelector(".sort_direction_icon");
  const sortableRow = document.querySelectorAll(".sortable_row");

  const technologyNameSort = document.querySelector(".technology_name a .sort_direction_icon");
  const experienceSort = document.querySelector(".experience a .sort_direction_icon");

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
          sortableRow[j].children[1].children[0].src = `images/${arrayToSort[i].image}.png`;
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

  openContactBoxBtn.addEventListener("click", async () => {
    envelopeBox.classList.remove("hidden_element");
    await envelopeBox.classList.add("visible_element");

    envelope.classList.remove("show_envelope_bottom");
    await envelope.classList.add("hide_envelope_bottom");

    envelopeTop.classList.remove("hide_envelope_top");
    await envelopeTop.classList.add("show_envelope_top");

    openContactBoxBtn.style.opacity = "0";
  });

  closeEnvelope.addEventListener("click", () => {
    envelopeBox.classList.add("hidden_element");
    envelopeBox.classList.remove("visible_element");

    envelopeTop.classList.add("hide_envelope_top");
    envelopeTop.classList.remove("show_envelope_top");

    envelope.classList.add("show_envelope_bottom");
    envelope.classList.remove("hide_envelope_bottom");

    setTimeout(() => {
      openContactBoxBtn.style.opacity = "1";
    }, 5000);
  });

  //smooth scroll

  function smoothScrollElem(element) {
    window.scrollTo({
      "behavior": "smooth",
      "left": 0,
      "top": element.offsetTop
    });
  }

  const navLinks = document.querySelectorAll(".menu_link");
  const sections = document.querySelectorAll(".smooth_scroll_section");

  for(let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", (e) => {
      for(let j = 0; j < sections.length; j++) {
        e.preventDefault();
        if(i === j) {
          smoothScrollElem(sections[j]);
        }
      }}
    );
  }
})();
