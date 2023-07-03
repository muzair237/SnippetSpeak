const express = require("express");
const router = express.Router();
const verifyToken = require("../verifyToken")
const blogModel = require("../db/Schemas/blogSchema");
router.use(express.json());

router.get("/:id",verifyToken, async (req, res) => {
    try {
      let data = await blogModel.find({ authorID: req.params.id });
      const count = data.length;
      res.send({data, count});
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });
  

module.exports = router;
