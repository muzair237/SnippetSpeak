const express = require("express");
const router = express.Router();
const verifyToken = require("../verifyToken")
const blogModel = require("../db/Schemas/blogSchema");
router.use(express.json());

router.put("/:id",verifyToken, async (req, res) => {
    try {
      const { id } = req.params;
      let data = await blogModel.updateOne(
        {_id: req.params.id},
        {$set:req.body}
      );
      res.send(data);
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  });
  
module.exports = router;
