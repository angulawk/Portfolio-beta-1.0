import { arrayToSort, tableHead } from "./array-to-sort.js";

export function createTable(table) {
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
