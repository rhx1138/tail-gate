import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
    console.log("create user body", req.body)
    res.send("user created");
})

export default router;