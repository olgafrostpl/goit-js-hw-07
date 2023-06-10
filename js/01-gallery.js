import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryItemsMarkup = galleryItems
  .map(({ preview, original, description }) => {
    return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
  })
  .join("");

const galleryEl = document.querySelector(".gallery");

galleryEl.innerHTML = galleryItemsMarkup;
// galleryEl.insertAdjacentHTML("beforeend", galleryItemsMarkup);
galleryEl.addEventListener("click", selectItem);

function selectItem(event) {
  event.preventDefault();

  if (!event.target.classList.contains("gallery__image")) {
    return;
  }

  const instance = basicLightbox.create(
    `<img src="${event.target.dataset.source}">`,
    {
      onShow: (instance) => {
        document.addEventListener("keydown", onEscKeyPress);
      },
      onClose: (instance) => {
        document.removeEventListener("keydown", onEscKeyPress);
      },
    }
  );
  instance.show();

  function onEscKeyPress(event) {
    if (event.code === "Escape") {
      instance.close();
    }
  }
}

console.log(galleryItems);
