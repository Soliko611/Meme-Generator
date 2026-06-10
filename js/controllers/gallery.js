"use strict"

function renderGallery() {
  const pics = getImgs()
  const strHtml = pics.map((pic) => {
    return `
          <arcticle>
          
          <img src="${pic.url}" onclick="onImgSelect(${pic.id})">
          </arcticle>
          `
  })
  const elPics = document.querySelector(".gallery-section")
  elPics.innerHTML = strHtml.join("")
}

function onImgSelect(picId) {
  setImg(picId)
  renderMeme()

  const elGallery = document.querySelector(".gallery-section")
  elGallery.classList.add("hidden")

  const elEditor = document.querySelector(".editor-section")
  elEditor.classList.remove("hidden")
}
