module.exports = app => {
  const controller = require("../controllers/schedule_constroller");

  var router = require("express").Router();

  router.post("/schedule/", controller.create);
  //router.get("/schedule/", controller.findAll);
  //router.get("/schedule/:uuid", controller.findOne);
  //router.get("/schedule/:uuid/associete/:uuid_associate", controller.findOneByAssociate);
  //router.get("/schedule/:uuid/collaborator/:uuid_collaborator", controller.findOneByCollaborator);
  //router.get("/calendar/:uuid/collaborator/:uuid_collaborator", controller.findOneByCollaborator);

  app.use("/api", router);
};
