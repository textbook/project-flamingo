const express = require("express");
const router = new express.Router();

router.get("/reports", (req, res) => {
  req.db
    .collection("reports")
    .find()
    .toArray((err, reports) => {
      return res.json(reports.map(({ _id, ...report }) => ({ ...report })));
    });
});

router.post("/login", (req, res) => {
  if (
    req.body.username === "ellen@ip.org"
    && req.body.password === "flamingo"
  ) {
    return res.sendStatus(200);
  }

  return res.sendStatus(401);
});

module.exports = router;
