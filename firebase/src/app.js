const $ = require("jquery");
const MarkdownIt = require("markdown-it");

import BlockList from "./blockList";
import database from "./database";
import BadList from "./BadList";

function bomb() {
  const audios = [
    "./audio/punch-middle2.mp3",
    "./audio/punch-middle2.mp3",
    "./audio/punch-middle2.mp3",
    "./audio/punch-middle2.mp3",
    "./audio/punch-middle2.mp3",
    "./audio/punch-middle2.mp3",
    "./audio/punch-middle2.mp3",
    "./audio/punch-middle2.mp3",
    "./audio/punch-middle2.mp3",
    "./audio/punch-middle2.mp3",
    "./audio/punch-middle2.mp3",
    "./audio/punch-middle2.mp3",
    "./audio/punch-middle2.mp3",
    "./audio/punch-middle2.mp3",
    "./audio/punch-middle2.mp3",
    "./audio/game_swordman-damage2.mp3",
    "./audio/game_swordman-damage1.mp3"
  ];
  const audio = new Audio(audios[Math.floor(Math.random() * audios.length)]);
  audio.play();
}

function dead() {
  const audio = new Audio("./audio/game_swordman-death1.mp3");
  audio.play();
}

(function() {
  const blockList = new BlockList();
  blockList.render();

  let triggerCount = 0;
  const badList = new BadList(database, blockList);
  badList.afterExecute(data => {
    const remainingCount = blockList.fill(triggerCount++);
    remainingCount > 0 ? bomb() : dead();
  });

  const md = new MarkdownIt();
  const text = $("#md")
    .text()
    .split("\n")
    .reduce((result, text) => {
      return (result = result + text.trim() + "\n");
    }, "");

  const mdHtml = md.render(text);
  let i = 0;
  const renderHtml = mdHtml.split("<hr>").reduce((rtn, b) => {
    return (rtn =
      rtn +
      '<div class="page markdown-body" id="page' +
      ++i +
      '">' +
      b +
      "</div>");
  }, "");

  $("#main").append(renderHtml);

  let currentPage = 1;
  function refreshPage(id) {
    $(".page").hide();
    $(id).show();
    blockList.clear();
    triggerCount = 0;
  }
  refreshPage("#page" + currentPage);
  $(window).keyup(e => {
    if (e.keyCode === 39 || e.keyCode === 34) {
      if (currentPage < i) {
        currentPage++;
        refreshPage("#page" + currentPage);
      } else if (currentPage == i) {
        currentPage++;
        if ($("#resultPage").length === 0) badList.renderResult();
        refreshPage("#resultPage");
      }
    } else if (e.keyCode === 37 || e.keyCode === 33) {
      if (currentPage > 1) {
        currentPage--;
        refreshPage("#page" + currentPage);
      }
    }
  });
})();
