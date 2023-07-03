const express = require("express");
const router = express.Router();
const verifyToken = require("../verifyToken")
const blogModel = require("../db/Schemas/blogSchema");
router.use(express.json());

router.delete("/:id",verifyToken, async (req, res) => {
    try {
      let data = await blogModel.deleteOne({ _id: req.params.id });
      res.send({data});
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });
  

module.exports = router;