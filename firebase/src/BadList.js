const $ = require("jquery");

export default class BadList {
  constructor(database) {
    this.database = database;
    this.databasePrefix = "badList";
  }

  fire(nickname) {
    this.database
      .ref(this.databasePrefix)
      .push({ executed: false, nickname: nickname });
  }

  execute(key) {
    this.database
      .ref(this.databasePrefix + "/" + key)
      .update({ executed: true });
  }

  afterExecute(callback) {
    const list = this.database.ref(this.databasePrefix);
    list.on("child_added", data => {
      if (data.val().executed !== true) {
        this.execute(data.key);
        callback(data);
      }
    });
  }

  renderResult() {
    const countPerUser = {};
    this.database
      .ref(this.databasePrefix)
      .once("value")
      .then(function(snapshot) {
        const values = Object.values(snapshot.val());
        values.forEach(v => {
          if (countPerUser[v["nickname"]] === void 0)
            countPerUser[v["nickname"]] = 0;
          countPerUser[v["nickname"]]++;
        });

        const page = $('<div class="page markdown-body" id="resultPage">');
        const table = $("<table>");
        let i = 0;
        Object.entries(countPerUser)
          .sort((a, b) => {
            return b[1] - a[1];
          })
          .forEach(value => {
            if (i++ >= 10) return;
            table.append(
              $("<tr><td>" + value[0] + "</td><td>" + value[1] + "</td></tr>")
            );
          });
        page.append(table);
        $("#main").append(page);
      });
  }
}
