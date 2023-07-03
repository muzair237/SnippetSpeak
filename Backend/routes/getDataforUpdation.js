const express = require("express");
const router = express.Router();
const verifyToken = require("../verifyToken")
const blogModel = require("../db/Schemas/blogSchema");
router.use(express.json());

router.get("/:id",verifyToken, async (req, res) => {
    try {
      let data = await blogModel.findOne({ _id: req.params.id });
      res.send(data);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });
  

module.exports = router;
