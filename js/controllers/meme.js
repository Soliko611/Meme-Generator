"use strict"

var gElCanvas
var gCtx

function onInit() {
  gElCanvas = document.querySelector("canvas")
  gCtx = gElCanvas.getContext("2d")

  renderGallery()
  renderMeme()
}

function renderMeme() {
  const meme = getMeme()
  const ImgUrl = getImgById(meme.selectedImgId)

  const elImg = new Image()
  elImg.src = ImgUrl.url

  elImg.onload = () => {
    gElCanvas.height =
      (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

    renderLines()
  }
}
function renderLines() {
    const meme = getMeme()

    meme.lines.forEach(line => {
        gCtx.fillStyle = line.color
        gCtx.font = `${line.size}px Arial`

        gCtx.fillText(line.txt,line.x, line.y)
    });
    
}

function onAddLine(){
    addLine()
    renderMeme()
}

function onSwitchLine(){
    SwitchLine()
    const meme = getMeme()
    const currLineIdx = meme.selectedLineIdx

    const elInput = document.querySelector('input[type="text"]')
    elInput.value = meme.lines[currLineIdx].txt
    
    renderMeme()
}
function onSetText(txt) {
  setLineTxt(txt)
  renderMeme()
}

function onSetColor(color) {
  setColor(color)
  renderMeme()
}

function onUpdateFontSize(diff) {
  setFontSize(diff)
  renderMeme()
}
