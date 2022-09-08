const service = require("../services/schedule_service");
const { validator_schedule } = require("../helper/body_validator");

exports.create = (req, res) => {

  console.log(`[POST] v1/schedule`);


  const retornValidate = validator_schedule(req.body)

  if (!retornValidate.errors()) {
    console.log('Error: ', retornValidate.errors().first());
    res.status(400).send(retornValidate.errors());
    return;
  }

  service
    .save(req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the schedule."
      });
    });
};
