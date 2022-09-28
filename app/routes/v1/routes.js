module.exports = app => {
  var router = require("express").Router();
  const controller = require("../../controllers/schedule_constroller");

  console.log(`routes > /schedule/v1/`)


  router.post("/", controller.create);
  //router.get("/schedule/", controller.findAll);
  //router.get("/schedule/:uuid", controller.findOne);
  //router.get("/schedule/:uuid/associete/:uuid_associate", controller.findOneByAssociate);
  //router.get("/schedule/:uuid/collaborator/:uuid_collaborator", controller.findOneByCollaborator);
  //router.get("/calendar/:uuid/collaborator/:uuid_collaborator", controller.findOneByCollaborator);

  app.use("/schedule/v1/", router);
};
