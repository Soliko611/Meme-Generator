"use strict"
var gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    { txt: "I sometimes eat Falafel", size: 20, color: "red", x: 20, y: 50 },
    {
      txt: "Puki Suki Toki Moki Loki",
      size: 20,
      color: "black",
      x: 20,
      y: 250,
    },
  ],
}
var gImgs = [
  { id: 1, url: "img/meme-imgs (square)/1.jpg", keywords: ["funny", "cat"] },
  { id: 2, url: "img/meme-imgs (square)/2.jpg", keywords: ["funny", "cat"] },
]
var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

function getMeme() {
  return gMeme
}
function getImgs() {
  return gImgs
}

function getImgById(imgId) {
  return gImgs.find((pic) => imgId === pic.id)
}

function removeImg(imgId) {
  const imgIdx = gImgs.findIndex((pic) => picId === pic.id)
  gImgs.splice(imgIdx, 1)

  _saveImgsToStorage()
}

function addImg(url) {
  const img = _createImg(url)
  gImgs.unshift(img)
  _saveImgsToStorage()
  return img
}

function setImg(imgId) {
  gMeme.selectedImgId = imgId
}
function setLineTxt(txt) {
  const currLineIdx = gMeme.selectedLineIdx
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

function SwitchLine() {
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

function _createImg(Url) {
  return {
    id: makeId(),
    createdAt: Date.now(),
    url,
  }
}
function _saveImgsToStorage() {
  saveToStorage(STORAGE_KEY, gImgs)
}
