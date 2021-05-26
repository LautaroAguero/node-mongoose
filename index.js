const mongoose = require("mongoose");
const Dishes = require("./models/dishes");

const url = "mongodb://localhost:27017/confusion";
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connected correctly to server");

  Dishes.create({
    name: "Uthapizza",
    description: "test",
  })
    .then((dish) => {
      console.log(dish);

      return Dishes.findByIdAndUpdate(
        dish._id,
        {
          $set: { description: "Updated Test" },
        },
        { new: true }
      ).exec();
    })
    .then((dish) => {
      console.log(dish);

      dish.comments.push({
        rating: 5,
        comment: "I´m getting a sinking feeling!",
        author: "Leonardo Di Carpaccio",
      });

      return dish.save();
    })
    .then((dish) => {
      console.log(dish);

      return Dishes.deleteOne({});
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
    });
});
