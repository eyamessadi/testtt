const mongoose = require("mongoose");

mongoose.connect('mongodb://mongo/testdb').then(() => {
console.log("Connected to Database !");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

