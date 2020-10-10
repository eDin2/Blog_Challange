//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));


/* +++++++++++++++++++++++++++++++++++++++ */
let posts = [];
// alle posts werden von der web-Seite über den Server in dieses Array geschrieben
/* +++++++++++++++++++++++++++++++++++++++ */



/* ############################################################################################################## */
/* ############################################################################################################## */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* ############################################################################################################## */
/* ############################################################################################################## */
/* GET Abfrage die erste HOME Seite der Website*/
/* ################################################# */
app.get("/", (req, res) => {
  res.render("home", {
    startingHomeContent: homeStartingContent,
    composePost: posts
    // composePost sind die gepushten eingaben ins Array
  });
  /* mit render wird mittels express die EJS aus dem Ordner views die home.ejs gerendert */
  // console.log(posts);
});





/* ############################################################################################################## */
/* ############################################################################################################## */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* ############################################################################################################## */
/* ############################################################################################################## */
/* GET Abfrage für die zweite ABOUT Seite der Website */
/* ################################################# */
app.get("/about", (req, res) => {
  res.render("about", {
    aboutContent: aboutContent,
  });
  /* mit render wird mittels express die EJS aus dem Ordner views in die list.ejs gerendert */
  /* listTitle befindet sich in der list.EJS datei */
});



/* ############################################################################################################## */
/* ############################################################################################################## */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* ############################################################################################################## */
/* ############################################################################################################## */
/* GET Abfrage für die dritte CONTACT Seite der Website */
/* ################################################# */
app.get("/contact", (req, res) => {
  res.render("contact", {
    contactContent: contactContent
  });
  /* mit render wird mittels express die EJS aus dem Ordner views in die list.ejs gerendert */
  /* listTitle befindet sich in der list.EJS datei */
});



/* ############################################################################################################## */
/* ############################################################################################################## */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* ############################################################################################################## */
/* ############################################################################################################## */
/* GET Abfrage für die vierte COMPOSE Seite der Website */
/* ################################################# */
app.get("/compose", (req, res) => {
  res.render("compose", {});
  /* mit render wird mittels express die EJS aus dem Ordner views in die list.ejs gerendert */
  /* listTitle befindet sich in der list.EJS datei */
});

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* ############################################################################################################## */
/* POST Abfrage */
/* mit einem POST request können wir die eingabe vom der webseite an unseren Server senden */
/* hier wird die eingabe abgefangen und im Server verarbeitet */
/* ########################################################################################### */
app.post("/compose", (req, res) => {
  const titleEntry = req.body.postTitle;
  const contentEntry = req.body.postContent;
  // bevor wir den body benutzen können benötigen wir den bodyParser
  // POST Anfrage(req) an den body, durchsuchen nach dem Wert der als postTitle und postContent bezeichnet wird

  const POST = {
    keyTitle: titleEntry,
    keyContent: contentEntry
  };
  // mit der const POST (ist ein Objekt) werden die abgefangenen einträge als ky generiert

  posts.push(POST);
  // die einträge aus Seite compose sollten in die const POST abgefangen werden
  // und dann in die globale variabel posts gepusht 

  res.redirect("/");
  // hiermit wird die Antwort an die Webseite zurück diriegiert
  // also zur home route
});


// ##################################################################
// hiermit wird das Express Routing angesprochen
// z.Bsp. eingabe in der adressleiste
app.get("/posts/:postName", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.postName);
  // weil die einträge in die adressleiste immer in kleinen buchstabeen ingetragen werdeen müssen und keine leerzeichen es gibt
  // kommt lodash zum einsatz welcher alles in lowerCasse umwandelt
  /* wir benötign eine schleife die unser Array(posts) durchluft und dann bei einem Besimmten eintrag hängen blebt */
  posts.forEach((post) => {
    const storedTitle = _.lowerCase(post.keyTitle);

    if (requestedTitle === storedTitle) {
      res.render("post", { 
        title: post.keyTitle, // der titel der in post.ejs gerendert wird, kommt aus der FOR schleife
        content: post.keyContent // genau so wie der content
      });
    }
  });

});





/* ############################################################################################################## */
/* ############################################################################################################## */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* ############################################################################################################## */
/* ############################################################################################################## */
/* SERVER begining */
/* ################################################# */
app.listen(3000, () => {
  console.log("Server started on port 3000");
});