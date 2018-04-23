const $ = require("jquery");
const Konami = require("Konami");
import Cookies from "js-cookie";

import database from "./database";
import BadList from "./BadList";

(function() {
  let nickname = Cookies.get("nickname");
  if (nickname) {
    $("#badButtonSection").show();
  } else {
    $("#nicknameSection").show();
    $("#submit").on("click", () => {
      nickname = $("#nickname").val();
      if (/^[A-za-z0-9]+$/g.exec(nickname) === null) {
        $("#nickname").val("");
        return;
      }
      Cookies.set("nickname", nickname);
      $("#nicknameSection").hide();
      $("#badButtonSection").show();
    });
  }

  const badList = new BadList(database);

  $("#badButton").on("click", () => {
    $("#badButton")
      .prop("disabled", true)
      .css({ opacity: 0.5 });
    badList.fire(nickname);
    setTimeout(() => {
      $("#badButton")
        .prop("disabled", false)
        .css({ opacity: 1 });
    }, 1000);
  });

  $("#autoBadButton").on("click", () => {
    let runCount = 0;
    const id = setInterval(() => {
      badList.fire();
      if (++runCount > 50) clearInterval(id);
    }, 50);
  });

  new Konami(() => {
    $("#autoBadButton").show();
  });
})();
