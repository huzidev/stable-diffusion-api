const axios = require("axios");
const path = require("path");
const fs = require("fs");
const util = require('util');
const ckptSD = require("./index");

module.exports.imgToimg = function imgToimg(respImage, fileName) {
    var imgToimgData = JSON.stringify({
        "init_images": respImage,
        "sampler_name": "Heun",
        "denoising_strength": 0.75,
        // "height": 1024,
        // "width": 1024,
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
            const { images, parameters } = imgResp.data;
            let arrofKey = ["prompt", "denoising_strength", "seed", "height", "width", "sampler_name", "cfg_scale", "steps", "restore_faces"];
            let obj = parameters;
            let newObj = {};
            for (const key in obj) {
                arrofKey.forEach(element => {
                    if (key === element) {
                        newObj[key] = obj[key]  
                    }
                });
                newObj = {
                    ...newObj,
                    Model: ckptSD
                }
            }
            for (const imgToImg of images) {
                const imgBuffer = Buffer.from(imgToImg, "base64");
                const imgToImgPath = path.join("img2img", `${fileName}.png`);
                const textFile = path.join("img2img", `${fileName}.txt`)
                fs.writeFileSync(imgToImgPath, imgBuffer);
                fs.writeFileSync(textFile, util.inspect(newObj, false, 2, false));
            }
        } catch (e) {
            console.log("Error", e);
        }
    }
    imgToImg();
}