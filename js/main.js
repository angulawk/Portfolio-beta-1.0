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
    smallViewArray[index].addEventListener("mouseover", function() {
      imageHeight = parseInt(this.childNodes[1].height);
      const hiddenImageHeight = imageHeight - smallViewHeight;
      imageHeight = `-${hiddenImageHeight}px`;
      this.childNodes[1].style.top = imageHeight;
    });

    smallViewArray[index].addEventListener("mouseleave", function() {
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

  window.addEventListener("scroll", function(e) {
    const menu = document.querySelector("#menu");
    if (window.scrollY > window.innerHeight / 2) {
      menu.classList.add("fixed");
    } else {
      menu.classList.remove("fixed");
    }
  });

  //Active link

  const linksList = document.querySelectorAll(".links li a");

  linksList.forEach(function(item) {
    item.addEventListener("click", function() {
      linksList.forEach(function(element) {
        element.classList.remove("active_link");
      });
      item.classList.add("active_link");
    });
  });

  //Timeline animation

  const timelineDots = document.querySelectorAll(".dot");

  for (let index = 0; index < timelineDots.length; index++) {
    timelineDots[index].addEventListener("click", function() {
      const lineInsideTimeline = document.querySelector(".inside");

      lineInsideTimeline.style.width = `${(index + 1) * 20}%`;
    });
  }
})();

$(".modal").wrap('<div class="mask"></div>');
$(".mask").click(function() {
  $(this).fadeOut(300);
  $(".mask article").animate(
    {
      top: "-100%"
    },
    300
  );
});

$(".dot").click(function() {
  var modal = $(this).attr("id");
  $(".mask")
    .has("article." + modal)
    .fadeIn(300);
  $(".mask article." + modal)
    .fadeIn(0)
    .animate(
      {
        top: "10%"
      },
      300
    );
});
