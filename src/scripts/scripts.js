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
  const modalElement = document.querySelector(".detail-product-modal");
  modalElement.style.display = "block";

  document.querySelector(".detail-product-modal img").src = product?.img;
  document.querySelector(".detail-product-modal .title").innerHTML =
    product?.name;
  document.querySelector(".detail-product-modal .product-price").innerHTML =
    product?.price;
  document.querySelector(
    ".detail-product-modal .product-description"
  ).innerHTML = product?.description;

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

  document.querySelector(".detail-product-modal .marketplaces").innerHTML =
    marketplacesElement;

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
      .querySelector(".modal-content .close-button")
      ?.addEventListener("click", (event) => {
        event.preventDefault();
        hideElement(".detail-product-modal");
        openScrolling();
      });

    const yearElement = document.querySelector(".year");
    yearElement.innerHTML = getYear();

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
  } catch (err) {
    console.error(err);
  }
});
