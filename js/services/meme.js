"use strict"
var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: "I sometimes eat Falafel",
      size: 20,
      color: "red",
      x: 20,
      y: 50,
      width: 100,
      height: 20,
    },
    {
      txt: "Puki Suki Toki Moki Loki",
      size: 20,
      color: "black",
      x: 20,
      y: 250,
      width: 100,
      height: 20,
    },
  ],
}
var gImgs = []
var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

function getMeme() {
  return gMeme
}

function getImgById(imgId) {
  return gImgs.find((pic) => imgId === pic.id)
}

function removeImg(imgId) {
  const imgIdx = gImgs.findIndex((pic) => imgId === pic.id)
  gImgs.splice(imgIdx, 1)

  // _saveImgsToStorage()
}

function addImg(url) {
  const img = _createImg(url)
  gImgs.unshift(img)
  // _saveImgsToStorage()
  return img
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId
}
function setLineTxt(txt) {
  const currLineIdx = gMeme.selectedLineIdx
  if(currLineIdx === -1) return
  gMeme.lines[currLineIdx].txt = txt
}
function setColor(color) {
  const currLineIdx = gMeme.selectedLineIdx
  gMeme.lines[currLineIdx].color = color
}
function setFontSize(diff) {
  const currLineIdx = gMeme.selectedLineIdx
  gMeme.lines[currLineIdx].size += diff
}
function drewRectLine(line) {
  const textWidth = gCtx.measureText(line.txt).width
  const textHeight = line.size
  gCtx.strokeStyle = "black"
  gCtx.lineWidth = 2
  gCtx.strokeRect(
    line.x - 5,
    line.y - textHeight,
    textWidth + 10,
    textHeight + 10,
  )
}

function switchLine() {
  gMeme.selectedLineIdx++

  if (gMeme.selectedLineIdx >= gMeme.lines.length) {
    gMeme.selectedLineIdx = 0
  }
}
function addLine() {
  const newLine = {
    txt: "New Line",
    size: 20,
    color: "white",
    x: 20,
    y: 150,
  }
  gMeme.lines.push(newLine)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function removeLine() {
  const currLineIdx = gMeme.selectedLineIdx
  if(currLineIdx === -1) return
  gMeme.lines.splice(currLineIdx, 1)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
}
function isLineClicked(clickedPos) {
  const clickedLineIdx = gMeme.lines.findIndex((line) => {
    return (
      clickedPos.x >= line.x &&
      clickedPos.x <= line.x + line.width &&
      clickedPos.y >= line.y - line.height &&
      clickedPos.y <= line.y
    )
  })

  if (clickedLineIdx !== -1) {
    gMeme.selectedLineIdx = clickedLineIdx
    return true
  }
  return false
}
function setNoLineSelected(){
  gMeme.selectedLineIdx = -1
}

function moveLine(pos) {
  const currLineIdx = gMeme.selectedLineIdx
  gMeme.lines[currLineIdx].x = pos.x
  gMeme.lines[currLineIdx].y = pos.y
}
function moveLineVertical(diff){
  const currLineIdx = gMeme.selectedLineIdx
  if(currLineIdx === -1) return
  gMeme.lines[currLineIdx].y += diff
}

function _createImgs() {
const totalImgs = 18
for(var i = 1; i<=totalImgs; i++){
  gImgs.push({
    id: i,
    url: `img/meme-imgs (square)/${i}.jpg`,
    keywords: ['funny']
  })
}
}

function _createImg(url) {
  return {
    id: makeId(),
    createdAt: Date.now(),
    url,
    keywords:['funny']
  }
}
function getImgs() {
  return gImgs
}

_createImgs()

// function _saveImgsToStorage() {
//   saveToStorage(STORAGE_KEY, gImgs)
// }
