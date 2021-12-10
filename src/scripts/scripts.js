const lockScrolling = () => {
  const bodyElement = document.querySelector("body");
  bodyElement.style.overflow = "hidden";
};

const hideElement = (selector) => {
  const element = document.querySelector(selector);
  element.style.display = "none";
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
}

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

const openModalProductMobile = (product) => {
  const maxMobile = 768;
  if (window.innerWidth >= maxMobile) {
    return;
  }

  showElement(".detail-product-modal");
  src(".detail-product-modal img", product?.img);
  innerHTML(".detail-product-modal .title", product?.name);
  innerHTML(".detail-product-modal .product-price", product?.price);
  innerHTML(".detail-product-modal .product-description", product?.description);

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

  lockScrolling();
};

const setActiveImg = (elem, img) => {
  console.log(img);
  src(".image-product-modal .focused-img-wrapper img", img);

  toggle(".image-product-modal .image-list .img-wrapper.active", "active");
  elem.classList.add("active");
};

const populateImage = (image_list) => {
  let imgList = "";
  image_list?.length > 0 &&
    image_list.forEach((image, idx) => {
      const className = `img-wrapper ${idx === 0 ? 'active' : ''}`;
      imgList += `
        <div class="${className}" onclick="setActiveImg(this, '${image}')">
          <img src="${image}" alt=" " />
        </div>
      `;
    });
  innerHTML(".image-product-modal .image-list", imgList);
};

const openModalImage = (product) => {
  console.log(product);

  showElement(".image-product-modal");
  innerHTML(".image-product-modal .modal-name", product?.name);
  src(".image-product-modal .focused-img-wrapper img", product?.image_list[0]);

  populateImage(product?.image_list);
  lockScrolling();
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

    const yearElement = document.querySelector(".year");
    yearElement.innerHTML = getYear();

    hideElement(".detail-product-modal");
    hideElement(".image-product-modal");
  } catch (err) {
    console.error(err);
  }
});
