const proffys = [
  {
    name: "Carolina Mesquita",
    avatar: "./images/carol.jpg",
    whatsapp: 123456789,
    bio:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, corrupti earum facere quisquam magnam ducimus obcaecati tempore, molestiae dolores odit expedita adipisci, vitae repudiandae sequi in asperiores facilis numquam quibusdam!",
    subject: "java",
    cost: "20,00",
    weekday: [0],
    time_from: [720],
    time_to: [1220],
  },
  {
    name: "Geise Melina",
    avatar: "./images/geise.jpg",
    whatsapp: 123456789,
    bio:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, corrupti earum facere quisquam magnam ducimus obcaecati tempore, molestiae dolores odit expedita adipisci, vitae repudiandae sequi in asperiores facilis numquam quibusdam!",
    subject: "ingles",
    cost: "25,00",
    weekday: [0],
    time_from: [720],
    time_to: [1220],
  },
];
const subjects = [
   "Artes",
   "Biologia",
   "Ciências",
   "Educação Física",
   "Física",
   "Geografia",
   "História",
   "Matemática",
   "Português",
   "Química"
]
const weekdays  = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
]
function getSubject(subjectNumber){
    const position = +subjectNumber - 1
    return subjects[position]
}

function pageLanding(req, res) {
  return res.render("index.html");
}
function pageStudy(req, res) {
    const filters = req.query
  return res.render("study.html", {proffys, filters, subjects, weekdays})
}
function pageGiveClasses(req, res) {
    const data = req.query
    const isNotEmpty = Object.keys(data).length > 0
    if(isNotEmpty){
        data.subject = getSubject(data.subject)
        proffys.push(data)
        return res.redirect("/study")
    }
    
return res.render("give-classes.html",{subjects, weekdays});
}

const express = require("express");
const server = express();
const nunjucks = require("nunjucks");

//configura nunjucks

nunjucks.configure('src/views', {
  express: server,
  noCache: true,
});

server
  //configuração de aarquivos estaticos
  .use(express.static("public"))
  //rotas da aplicação
  .get("/", pageLanding)
  .get("/study", pageStudy)
  .get("/give-classes", pageGiveClasses)

  .listen(5500);
