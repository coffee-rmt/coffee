let isOpenPourCoffee = true;

const lockScrolling = () => {
  const bodyElement = document.querySelector("body");
  bodyElement.style.overflow = "hidden";
};

const hideElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    element.style.display = "none";
  }
};

const showElement = (selector) => {
  const element = document.querySelector(selector);
  element.style.display = "block";
};

const openScrolling = () => {
  const bodyElement = document.querySelector("body");
  bodyElement.style.overflow = "visible";
};

const innerHTML = (selector, value) => {
  document.querySelector(selector).innerHTML = value;
};

const src = (selector, value) => {
  document.querySelector(selector).src = value;
};

const toggle = (selector, value) => {
  document.querySelector(selector).classList.toggle(value);
};

const openSideDrawer = () => {
  showElement("#side-drawer");
  lockScrolling();
};

const closeSideDrawer = () => {
  hideElement("#side-drawer");
  openScrolling();
};

const getYear = () => {
  return new Date().getFullYear();
};

const setActiveImgOnMobile = (elem, img) => {
  src(".detail-product-modal img", img);

  toggle(".detail-product-modal .image-list .img-wrapper.active", "active");
  elem.classList.add("active");
};

const populateImageOnMobile = (image_list) => {
  let imgList = "";
  image_list?.length > 0 &&
    image_list.forEach((image, idx) => {
      const className = `img-wrapper ${idx === 0 ? "active" : ""}`;
      imgList += `
        <div class="${className}" onclick="setActiveImgOnMobile(this, '${image}')">
          <img src="${image}" alt=" " />
        </div>
      `;
    });
  innerHTML(".detail-product-modal .image-list", imgList);
};

const openModalImage = (product) => {
  const maxMobile = 768;
  if (window.innerWidth < maxMobile) {
    return;
  }

  const imageList = product?.image_list || product?.img;

  showElement(".image-product-modal");
  innerHTML(".image-product-modal .modal-name", product?.name);
  src(".image-product-modal .focused-img-wrapper img", imageList[0]);

  populateImageOnModal(imageList);
  innerHTML(".image-list-wrapper .description-product", product?.description);
  lockScrolling();
};

const openModalProductMobile = (product, isCoffeePage) => {
  const maxMobile = 768;
  if (window.innerWidth >= maxMobile && !isCoffeePage) {
    return;
  }

  if (window.innerWidth >= maxMobile && isCoffeePage) {
    return openModalImage(product);
  }

  showElement(".detail-product-modal");
  src(
    ".detail-product-modal img",
    product.img.length > 0 ? product.img[0] : ""
  );
  innerHTML(".detail-product-modal .title", product?.name);
  innerHTML(".detail-product-modal .product-price", product?.price);
  innerHTML(".detail-product-modal .product-description", product?.description);

  product?.before_discount_price &&
    innerHTML(
      ".detail-product-modal .product-discount",
      product?.before_discount_price
    );

  let marketplacesElement = "";
  product.marketplaces?.forEach((marketplace) => {
    const buttonColor = marketplace.button_color || "#00CC5E";
    const fontColor = marketplace.font_color || "#FFFFFF";
    const style = `background-color: ${buttonColor}; color: ${fontColor};`;

    marketplacesElement =
      marketplacesElement +
      `<a href="${
        marketplace.link || "#"
      }" target="_blank" style="${style}" class="button">${
        marketplace.name
      }</a>`;
  });
  innerHTML(".detail-product-modal .marketplaces", marketplacesElement);
  populateImageOnMobile(product.img);

  lockScrolling();
};

const setActiveImgOnModal = (elem, img) => {
  src(".image-product-modal .focused-img-wrapper img", img);

  toggle(".image-product-modal .image-list .img-wrapper.active", "active");
  elem.classList.add("active");
};

const populateImageOnModal = (image_list) => {
  let imgList = "";
  image_list?.length > 0 &&
    image_list.forEach((image, idx) => {
      const className = `img-wrapper ${idx === 0 ? "active" : ""}`;
      imgList += `
        <div class="${className}" onclick="setActiveImgOnModal(this, '${image}')">
          <img src="${image}" alt=" " />
        </div>
      `;
    });
  innerHTML(".image-product-modal .image-list", imgList);
};

const keyPressEsc = () => {
  document.onkeydown = (evt) => {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
      isEscape = evt.key === "Escape" || evt.key === "Esc";
    } else {
      isEscape = evt.keyCode === 27;
    }
    if (isEscape) {
      hideElement(".detail-product-modal");
      hideElement(".image-product-modal");
      openScrolling();
    }
  };
};

const loadFile = (event, selector) => {
  const output = document.querySelector(selector);
  (document.querySelector(".img-upload").style.marginTop = "0"),
    (output.src = URL.createObjectURL(event.target.files[0]));
  output.onload = () => {
    URL.revokeObjectURL(output.src);
  };
};

const adjustOpacityIndexSlider = () => {
  if (typeof jQuery != "undefined") {
    $(window).scroll(() => {
      const scrollTop = $(this).scrollTop();
      $(".slick-slider-wrapper")?.css({
        opacity: () => {
          const elementHeight = 450,
            opacity = (scrollTop - elementHeight) / elementHeight;
          return opacity;
        },
      });
    });
  }
};

const adjustWave = () => {
  if (typeof jQuery != "undefined") {
    $(".wave-rotating")?.css({
      height: window.innerWidth * 0.3,
      width: window.innerWidth * 0.3,
    });
    $(".wave-effect")?.css({
      width: window.innerWidth,
      height: "auto",
    });
  }
};

const adjustBannerItemSize = () => {
  if (typeof jQuery != "undefined") {
    adjustWave();
    $(window).resize(() => {
      adjustWave();
    });
  }
};

const closePourCoffee = () => {
  isOpenPourCoffee = false;
  const element = document.querySelector(".pour-coffee");
  element.style.right = "-84px";
  element.style.opacity = "0.6";
  const maxMobile = 768;
  if (window.innerWidth > maxMobile) {
    element.style.right = "-160px";
  }
  const elementButton = document.querySelector(".pour-coffee button");
  elementButton.style.transform = "rotate(180deg)";
};

const openPourCoffee = () => {
  isOpenPourCoffee = true;
  const element = document.querySelector(".pour-coffee");
  element.style.right = "0";
  element.style.opacity = "1";
  const elementButton = document.querySelector(".pour-coffee button");
  elementButton.style.transform = "rotate(0deg)";
};

const handlerBannerItemChange = (parentElement, isSecondary) => {
  const changePosition = () => {
    const bannerImgList = document.querySelectorAll(
      `${parentElement} .box-item-wrapper`
    );
    const boxListWrapper = document.querySelector(
      `${parentElement}.box-list-wrapper`
    );

    if (bannerImgList && boxListWrapper) {
      const updatedBoxItemList = [
        bannerImgList[0],
        ...[].slice.call(bannerImgList, 4),
      ];
      updatedBoxItemList.forEach((updatedBoxItem) => {
        boxListWrapper.appendChild(updatedBoxItem);
      });
    }
  };

  const initInterval = setInterval(changePosition, 1500);

  if (isSecondary) {
    $(`.box-item-detail.secondary-item`)?.mouseenter(() => {
      if (typeof mouseEnterInterval !== "undefined") {
        clearInterval(mouseEnterInterval);
      }
      if (initInterval) {
        clearInterval(initInterval);
      }
    });
  
    $(`.box-item-detail.secondary-item`)?.mouseleave(() => {
      mouseEnterInterval = setInterval(changePosition, 1500);
    });
  } else {
    $(`${parentElement} .box-item-wrapper`)?.mouseenter(() => {
      if (typeof mouseEnterInterval !== "undefined") {
        clearInterval(mouseEnterInterval);
      }
      if (initInterval) {
        clearInterval(initInterval);
      }
    });
  
    $(`${parentElement} .box-item-detail`)?.mouseleave(() => {
      mouseEnterInterval = setInterval(changePosition, 1500);
    });
  }
};

window.addEventListener("DOMContentLoaded", () => {
  try {
    document
      .querySelector("#side-drawer .drawer-right")
      ?.addEventListener("click", () => {
        closeSideDrawer();
      });

    document
      .querySelector(".hamburger-menu")
      ?.addEventListener("click", (event) => {
        event.preventDefault();
        openSideDrawer();
      });

    document
      .querySelector(".detail-product-modal")
      ?.addEventListener("click", (event) => {
        if (("event", event.path[0].className === "detail-product-modal")) {
          hideElement(".detail-product-modal");
          openScrolling();
        }
      });

    document
      .querySelector(".image-product-modal")
      ?.addEventListener("click", (event) => {
        if (("event", event.path[0].className === "image-product-modal")) {
          hideElement(".image-product-modal");
          openScrolling();
        }
      });

    document
      .querySelector(".image-product-modal .close-button")
      ?.addEventListener("click", (event) => {
        hideElement(".image-product-modal");
        openScrolling();
      });

    document
      .querySelector(".modal-content .close-button")
      ?.addEventListener("click", (event) => {
        event.preventDefault();
        hideElement(".detail-product-modal");
        openScrolling();
      });

    document.querySelector("#index-page")?.addEventListener("click", () => {
      window.location.replace("/view/index.html");
    });

    document.querySelector("#coffee-page")?.addEventListener("click", () => {
      window.location.replace("/view/coffee.html");
    });

    document
      .querySelector("#coffee-machine-page")
      ?.addEventListener("click", () => {
        window.location.replace("/view/coffee-machine.html");
      });

    keyPressEsc();

    const yearElement = document.querySelector(".year");
    yearElement.innerHTML = getYear();

    hideElement(".detail-product-modal");
    hideElement(".image-product-modal");

    adjustOpacityIndexSlider();
    adjustBannerItemSize();

    document
      .querySelector(".pour-coffee button")
      ?.addEventListener("click", () => {
        if (isOpenPourCoffee) {
          closePourCoffee();
        } else {
          openPourCoffee();
        }
      });

    handlerBannerItemChange(".banner-coffee-page");
    handlerBannerItemChange(".banner-index-page-01");
    handlerBannerItemChange(".swiper-slide-active .banner-index-page-02", true);
  } catch (err) {
    console.error(err);
  }
});
