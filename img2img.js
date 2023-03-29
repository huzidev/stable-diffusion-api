const axios = require("axios");
const path = require("path");
const fs = require("fs");

module.exports.newTest = function test(respImage, fileName) {
    var imgToimgData = JSON.stringify({
        "init_images": respImage,
        "denoising_strength": 0.35,
    });
    const imgToimgConfig = {
        method: 'post',
        url: 'http://127.0.0.1:7860/sdapi/v1/img2img',
        headers: {
            'Content-Type': 'application/json'
        },
        data: imgToimgData
    };
    async function imgToImg() {
        try {
            console.log("Generating img2img");
            const imgResp = await axios(imgToimgConfig);
            const { images } = imgResp.data;
            for (const imgToImg of images) {
                const imgBuffer = Buffer.from(imgToImg, "base64");
                const imgToImgPath = path.join("img2img", `${fileName}.png`);
                fs.writeFileSync(imgToImgPath, imgBuffer);
            }
        } catch (e) {
            console.log("Error", e);
        }
    }
    imgToImg();
}