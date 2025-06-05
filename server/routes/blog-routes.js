var express = require("express");
const router = express.Router();
const { blogController } = require("../controllers");
const bodyParser = require("body-parser");
router.use(bodyParser.json());

router.get("/getall", async function (req, res) {
  blogController.getAllBlogs(req, res);
});

router.get("/:ID", async function (req, res) {
  blogController.getBlog(req, res);
});

router.post("/", async function (req, res) {
  blogController.createBlog(req, res);
});
router.put("/:ID", async function (req, res) {
  blogController.updateBlog(req, res);
});

router.delete("/:ID", async function (req, res) {
  blogController.deleteBlog(req, res);
});

module.exports = router;
