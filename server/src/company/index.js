const routes = require("express").Router();

const { addAuthorizedEmail, deleteAuthorizedEmail } = require("../services/db");

routes.post("/authorizeemail", (req, res) => {
  const { email, companyId } = req.body;
  addAuthorizedEmail(email, companyId).then(dbRes => {
    if (dbRes.error) {
      res.statusMessage = "Error authorizing email";
      res.status(500).end();
    }
    res.json({ message: "Email authorized" });
  });
});

routes.delete("/removeauthorizedemail", (req, res) => {
  const { email } = req.body;
  deleteAuthorizedEmail(email).then(dbRes => {
    res.json(dbRes);
  });
});

module.exports = { routes };
