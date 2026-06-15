"use strict"

var gElCanvas
var gCtx

var gIsDrag = false


function onInit() {
  gElCanvas = document.querySelector("canvas")
  gCtx = gElCanvas.getContext("2d")

  addListeners()
  renderGallery()
  renderMeme()
}

function addListeners() {
	addMouseListeners()
	addTouchListeners()
  addUploadImgListener()
}

function addMouseListeners() {
	gElCanvas.addEventListener('mousedown', onDown)
	gElCanvas.addEventListener('mousemove', onMove)
	gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
	gElCanvas.addEventListener('touchstart', onDown)
	gElCanvas.addEventListener('touchmove', onMove)
	gElCanvas.addEventListener('touchend', onUp)
}
function addUploadImgListener() {
  fileInput.addEventListener('change', onUploadImg)
}

function onDown(ev) {
	const pos = getEvPos(ev)
  const isClicked = isLineClicked(pos)
  if(isClicked){
    gIsDrag = true
   
    const meme = getMeme()
    const elInput = document.querySelector('input[type="text"]')
    elInput.value = meme.lines[meme.selectedLineIdx].txt
  }else{
    
    const elInput = document.querySelector('input[type="text"]')
    elInput.value = ''
  }
  renderMeme()
}

function onMove(ev) {
	if (!gIsDrag) return

	const pos = getEvPos(ev)
  moveLine(pos)
  renderMeme()
}

function onUp() {
	gIsDrag = false
}
function onMoveLineVertical(diff){
  moveLineVertical(diff)
  renderMeme()
}

function onUploadImg(){
  const file = fileInput.files[0];
var fileName = file ? file.name : 'no file chosen'; 
  
if(!file) return

const fileImg = URL.createObjectURL(file)

const elImg = addImg(fileImg)
onImgSelect(elImg.id)

}

function getEvPos(ev) {
  if(ev.type.startsWith('touch')) {
    return {
      x: ev.touches[0].clientX - gElCanvas.getBoundingClientRect().left,
      y: ev.touches[0].clientY - gElCanvas.getBoundingClientRect().top,
    }
  } else {
    return {
      x: ev.offsetX,
      y: ev.offsetY,
    }
  }
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

    meme.lines.forEach((line, idx) => {
        gCtx.fillStyle = line.color
        gCtx.font = `${line.size}px Arial`
        gCtx.fillText(line.txt,line.x, line.y)
        line.width = gCtx.measureText(line.txt).width
        line.height = line.size
        if(idx === meme.selectedLineIdx){
          drewRectLine(line)
        }
       
    });
    
}
function onRemoveLine(){
  removeLine()
  renderMeme()
}

function onAddLine(){
    addLine()
    renderMeme()
}

function onSwitchLine(){
    switchLine()
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
