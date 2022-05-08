const foodDAO = require("../models/foodModel");
const staffDAO = require("../models/staffModel.js");

const db = new foodDAO();
db.food_insert();

exports.show_login = function (req, res) {
  res.render("user/login");
};

exports.handle_login = function (req, res) {
  res.render("staff", {
    title: "Staff Page",
    user: "user"
  });
};

exports.home_page = function (req, res) {
  res.render("main", {
    title: "Home Page"
  });
}

exports.home_page = (req, res) => {
  const css = [
    { url:'/css/styles.css'},
  ];
  res.render('main', { title: 'Home Page', css });
};


exports.about_page = function (req, res) {
  res.render("about", {
    title: "About Page"
  });
}

exports.displayMenu = function (req, res) {
  db.getAllFood()
    .then((FoodList) => {
      res.render("menu", {
        title: "Menu",
        food: FoodList,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
}

exports.Error = function (req, res) {
  res.render("sections/err", {
    title: "Error"
  });
}

exports.show_new_entries = function (req, res) {
  res.render("newEntry", {
    title: "add a new Dish",
    user: "user",
  });
};

exports.post_new_entry = function (req, res) {
  console.log("processing post-new_entry controller");
  if (!req.body.author) {
    response.status(400).send("Entries must have an author.");
    return;
  }
  db.addEntry(req.body.author, req.body.subject, req.body.contents);
  res.redirect("/loggedIn");
};

exports.show_user_entries = function (req, res) {
  let user = req.params.author;
  db.getEntriesByUser(user)
    .then((entries) => {
      res.render("home", {
        title: "Guest Book",
        user: "user",
        entries: entries,
      });
    })
    .catch((err) => {
      console.log("Error: ");
      console.log(JSON.stringify(err));
    });
};

exports.loggedIn_landing = function (req, res) {
  res.render("staff", {
    title: "Staff Page"
  });
};

exports.logout = function (req, res) {
  res.clearCookie("jwt").status(200).redirect("/");
};

exports.landing_page = function (req, res) {

  db.getAllEntries()
    .then((list) => {
      res.render("landing", {
        title: "Home",
        entries: list,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.show_register_page = function (req, res) {
  res.render("user/register");
};

exports.post_new_user = function (req, res) {
  const user = req.body.username;
  const password = req.body.pass;

  if (!user || !password) {
    res.send(401, "no user or no password");
    return;
  }
  staffDAO.lookup(user, function (err, u) {
    if (u) {
      res.send(401, "User exists:", user);
      return;
    }
    staffDAO.create(user, password);
    console.log("register user", user, "password", password);
    res.redirect("/login");
  });
};

exports.logout = function (req, res) {
  res.clearCookie("jwt").status(200).redirect("/");
};

