const Database = require("./db");
const createProffy = require('./createProffy')

Database.then(async (db) => {
  proffyValue = {
    name: "Carolina Mesquita",
    avatar: "https://avatars0.githubusercontent.com/u/5709420?s=460&v=4",
    whatsapp: 123456789,
    bio:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. A, corrupti earum facere quisquam magnam ducimus obcaecati tempore, molestiae dolores odit expedita adipisci, vitae repudiandae sequi in asperiores facilis numquam quibusdam!",
  };

  classValue = {
    subject: 1,
    cost: "20,00",
    //vem pelo banco de dados
  };
  classScheduleValues = [
    {
      weekday: 1,
      time_from: 720,
      time_to: 1220,
    },
    {
      weekday: 0,
      time_from: 720,
      time_to: 1220,
    },
  ];
  //await createProffy(db, {proffyValue, classValue, classScheduleValues})
  const selectedProffys =  await db.all("SELECT * FROM proffys")
  console.log(selectedProffys)
  const selectedClassesAndProffys =  await db.all(`
    SELECT classes.*, proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE classes.proffy_id = 1;
  `) 
  console.log(selectedClassesAndProffys)

  const selectClassesSchedules = await db.all (`
    SELECT class_schedule.*,
    FROM class_schedule 
    WHERE class_schedule.class_id = "1"
    AND class_schedule.weekday = "0"
    AND class_schedule.time_from <= "1300" 
    AND class_schedule.time_to >  "1300" 

  `)

});
