const axios = require("axios");
const path = require("path");
const fs = require("fs");

module.exports.upScale = function upScale(respImage, fileName) {
  var upScaleData = JSON.stringify({
    "image": respImage.toString(),
    "upscaling_resize": 4,
    "upscaling_crop": false,
    "upscaler_1": "SwinIR_4x"
  });
  const upScalerConfig = {
    method: 'post',
    url: 'http://127.0.0.1:7860/sdapi/v1/extra-single-image',
    headers: {
      'Content-Type': 'application/json'
    },
    data: upScaleData
  };
  async function upScaleImg() {
    try {
      console.log("Upscaling Img");
      const upScaleResp = await axios(upScalerConfig);
      const { image } = upScaleResp.data;
      const bufferUpScale = Buffer.from(image, "base64");
      // create upScale folder to save the file
      const upScalePath = path.join("upScale", `${fileName}.png`);
      fs.writeFileSync(upScalePath, bufferUpScale);
    } catch (e) {
      console.log("Error", e);
    }
  }
  upScaleImg();
}