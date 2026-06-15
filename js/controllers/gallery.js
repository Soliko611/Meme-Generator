"use strict"

function renderGallery() {
  const imgs = getImgs()
  const strHtml = imgs.map((img) => {
    return `
          <arcticle>
          <img src="${img.url}" onclick="onImgSelect(${img.id})">
          </arcticle>
          `
  })
  const elPics = document.querySelector(".images-container")
  elPics.innerHTML = strHtml.join("")
}

function onImgSelect(imgId) {
  const elGallery = document.querySelector(".gallery-section")
  elGallery.classList.add("hidden")

  const elEditor = document.querySelector(".editor-section")
  elEditor.classList.remove("hidden")

  setImg(imgId)
  renderMeme()
}
function toggleMenu() {
  document.body.classList.toggle("menu-open")
}

function onShowGallery() {
  const elGallery = document.querySelector(".gallery-section")

  elGallery.scrollIntoView({ behavior: "smooth" })
}
function onShowAbout() {
  const elAbout = document.querySelector(".about-section")

  elAbout.scrollIntoView({ behavior: "smooth" })
}
function onHireMe() {
  window.location.replace("https://www.linkedin.com/in/soli-kolet-58b5a6191/")
}
