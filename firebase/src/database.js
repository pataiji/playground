const firebase = require("firebase");

const config = {
  // firebaseの設定
};
firebase.initializeApp(config);

export default firebase.database();
