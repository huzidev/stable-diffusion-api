const axios = require("axios");
const path = require("path");
const fs = require("fs");
const util = require("util");
const ckptSD = require("./index");
const arr = require("./arrayVar")


const model = ckptSD.ckptSD;

module.exports.imgToimg = async function imgToImg() {
    try {
        console.log("Generating img2img");
        const imgResp = await axios(imgToimgConfig);
        const { images, parameters } = imgResp.data;
        const arrOfImg = arr.keyOfImg;
        let obj = parameters;
        let newObj = {};
        for (const key in obj) {
            arrOfImg.forEach(element => {
                if (key === element) {
                    newObj[key] = obj[key]
                }
            });
            newObj = {
                ...newObj,
                Model: model
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
