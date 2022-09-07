
const randomUUID = require('../helper/crypto')
const db = require("../models");
const Schedule = db.schedule;


exports.create = (req, res) => {
   
    const schedule = new Schedule({
      uuid: randomUUID(),
      associeate_uuid: req.body.associeate_uuid,
      provider_uuid: req.body.provider_uuid,
      partner_uuid: req.body.partner_uuid,
      description: req.body.description,
      scheduled_date: req.body.scheduled_date,
      scheduled_time: req.body.scheduled_time,
      status: Boolean,
      create_at: String,
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    });
   
    srevice
      .save(schedule)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  };