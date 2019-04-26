import { showElementOnClick } from "./helpers/show-element-on-click.js";
import { sortTable, sortNumber } from "./helpers/sort-table.js";
import { arrayToSort, tableHead } from "./helpers/array-to-sort.js";
import { createTable } from "./helpers/create-table.js";
import { smoothScrollElem } from "./helpers/smooth-scroll.js";
import { addArrow } from "./helpers/add-arrow.js";
import { sortRow } from "./helpers/sort-row.js";

(function() {
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
    if (window.scrollY > (menu.clientHeight / 2)) {
      menu.classList.add("fixed");
    } else {
      menu.classList.remove("fixed");
    }
  });

  //Active link

  // const linksList = document.querySelectorAll(".links li a");
  //
  // linksList.forEach(item => {
  //   item.addEventListener("click", function () {
  //     linksList.forEach(element => {
  //       element.classList.remove("active_link");
  //     });
  //     item.classList.add("active_link");
  //   });
  // });

  //Timeline animation

  const timelineDots = document.querySelectorAll(".dot");
  const modalContent = document.querySelectorAll(".modal_content");

  showElementOnClick(timelineDots, modalContent, true);

  //Workplace click

  const workplaceName = document.querySelectorAll(".workplace_name");
  const workplaceDescription = document.querySelectorAll(".workplace_description");

  showElementOnClick(workplaceName, workplaceDescription);

  //Sort array
  let table = document.querySelector("#technology-stack-table");
  createTable(table);

  let order = "desc";
  const sortDirectionIcon = document.querySelector(".sort_direction_icon");
  const sortableRow = document.querySelectorAll(".sortable_row");

  const technologyName = document.querySelector(".technology_name");
  const experience = document.querySelector(".experience");
  const technologyNameSort = document.querySelector(".technology_name a .sort_direction_icon");
  const experienceSort = document.querySelector(".experience a .sort_direction_icon");
  let direction = order === "asc" ? "up" : "down";
  sortRow(order, "name");


  technologyName.addEventListener("click", () => {
    (order === "asc") ? order = "desc" : order = "asc";

    addArrow(technologyNameSort, experienceSort, "name", order);
  });

  experience.addEventListener("click", () => {
    (order === "asc") ? order = "desc" : order = "asc";

    addArrow(experienceSort, technologyNameSort, "experience", order);
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

  let linksList = document.querySelectorAll(".links li a");

  linksList.forEach(item => {
    item.addEventListener("click", function () {
      linksList.forEach(element => {
        element.classList.remove("active_link");
      });
      item.classList.add("active_link");
    });
  });

  let scrolledElem;

  // function getOffset(el) {
  //   const rect = el.getBoundingClientRect();
  //   return {
  //     left: rect.left + window.scrollX,
  //     top: rect.top + window.scrollY
  //   };
  // }

  function isInView(elem){
   return document.querySelector(elem).offset().top - window.scrollTop() < document.querySelector(elem).height() ;
 }

  window.addEventListener("scroll", (e) => {
    linksList.forEach(element => {
      element.classList.remove("active_link");
    });

    // const portfolio = document.querySelector("#portfolio").getBoundingClientRect();
    const anchorHref = document.querySelectorAll(".menu_link");
    let scrolledElem;

    sections.forEach(section => {
      let sectionHeight = 0;
      // let bodyRect = document.body.getBoundingClientRect(),
      //   sectionClientRect = section.getBoundingClientRect(),
      //   offset = sectionClientRect.top - bodyRect.top;
      let sectionId = section.id;

      sectionHeight += section.clientHeight;

      console.log("sectionHeight", sectionHeight);
      console.log("window.scrollY", window.scrollY);

      if(sectionHeight >= window.scrollY) {
        scrolledElem = `${sectionId}`;
      }
    });

    // if(portfolio.height > Math.abs(portfolio.top)) {
    //   scrolledElem = "portfolio";
    // }

    linksList.forEach(element => {
      element.classList.remove("active_link");
    });

    anchorHref.forEach(item => {
      let editedHref = item.href.slice(item.href.indexOf("#"), item.href.length);

      if(editedHref === `#${scrolledElem}`) {
        item.classList.add("active_link");
      }
    })
  })
})();
