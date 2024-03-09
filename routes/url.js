const express = require("express");
const {handleGenerateNewShortURL, handleGetAnalytics, handleGetURLFromShortID} = require("../controllers/url");

const router = express.Router();

router.post("/" , handleGenerateNewShortURL);

router.get("/analytics/:shortId" , handleGetAnalytics);

router.get("/:shortId" , handleGetURLFromShortID);

module.exports = router;