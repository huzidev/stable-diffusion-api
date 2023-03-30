const axios = require('axios');
const path = require('path');
const fs = require('fs');
const get = require('prompt-sync')();
const util = require('util');
const img = require("./img2img");
const upScale = require("./upScale");
const arr = require("./arrayVar");
const method = require("./configTxt");

const { config, ckptConfig, ckptSD, folder } = method.config;

const fileName = Date.now();
async function main() {
  try {
    console.log("Generating...");
    await axios(ckptConfig);
    const resp = await axios(config);
    const { images, info } = resp.data;
    respImage = images;
    let obj = JSON.parse(info);
    const arrOFTxt = arr.keyOfTxt;
    let newObj = {};
    for (let key in obj) {
      arrOFTxt.forEach(value => {
        if (key === value) {
          newObj[key] = obj[key]
        }
      });
      newObj = {
        ...newObj,
        Model: ckptSD
      }
    }
    for (const image of images) {
      const buffer = Buffer.from(image, "base64");
      const imagePath = path.join(`images/${folder}`, `${fileName}.png`);
      const textFile = path.join(`images/${folder}`, `${fileName}.txt`);
      fs.writeFileSync(imagePath, buffer);
      // writeFileSync could not take object directly
      fs.writeFileSync(textFile, util.inspect(newObj, false, 2, false));
    }
    // img.imgToimg(respImage, fileName);
    upScale.upScale(respImage, fileName);
  } catch (e) {
    console.log('e', e);
  }
}

module.exports.ckptSD = ckptSD
main();