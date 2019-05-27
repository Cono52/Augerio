const routes = require("express").Router();

const {
  addAuthorizedEmail,
  deleteAuthorizedEmail,
  isUser
} = require("../services/db");

routes.post("/authorizeemail", async (req, res) => {
  const { email, companyId } = req.body;
  const alreadyExistsAsUser = await isUser(email);
  if (alreadyExistsAsUser) {
    res.statusMessage = "Cannot use this email";
    res.status(500).end();
    return;
  }
  addAuthorizedEmail(email, companyId).then(dbRes => {
    if (dbRes.error) {
      res.statusMessage = "Error authorizing email";
      res.status(500).end();
      return;
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
