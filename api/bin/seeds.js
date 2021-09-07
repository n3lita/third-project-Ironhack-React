require('dotenv').config();

const faker = require('faker');
const mongoose = require("mongoose");
const members = require("../data/members.json");
const Member = require("../models/member.model")

require('../config/db.config')

mongoose.connection.once("open", () => {
   mongoose.connection.dropDatabase()
   .then(() => console.log(`-Database dropped`))
   .then(() => {
      return Promise.all(
         members.map(member => {
            const newMember = {
               name: member.name, 
               email: member.email? member.email: faker.internet.email(),
               password: member.password? member.password: faker.internet.password(),
               interests: member.interests,
               age: member.age? member.age: faker.datatype.number(40),
               location: {
                  type: "Point",
                  coordinates: [0,0]
               }
            };
            return new Member(newMember).save()
         })
      );
   })
   .then(console.info('Sucessfully created the members'))
   .catch(error => console.error('An error ocurred running seeds', error))
   .then(() => mongoose.disconnect())
})

//Member.create(members))
