var express = require("express");
const router = express.Router();
const { supportController } = require("../controllers");
const bodyParser = require("body-parser");
router.use(bodyParser.json());

router.get("/", async function (req, res) {
  supportController.getAllEntries(req, res);
});

router.post("/insert", async function (req, res) {
  supportController.insert(req, res);
});

router.put("/update", async function (req, res) {
  supportController.updateEntries(req, res);
});

router.delete("/delete", async function (req, res) {
  supportController.deleteEntry(req, res);
});

module.exports = router;
