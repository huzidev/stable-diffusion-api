const axios = require('axios');
const path = require('path');
const fs = require('fs');
const get = require('prompt-sync')();
const util = require('util');
const img = require("./img2img");
const upScale = require("./upScale");
const arr = require("./arrayVar");
const method = require("./config");

// For taking input after npm start
//   let obj = {
//     prompt: "",
//     steps: 0
//   };

// for (const val in obj) {
//   obj[val] = get(`${val} : `)
// }

// const { prompt, steps } = obj;

// input as argument (npm start : npm start "prompt" steps)
// const prompt = process.argv[2];
// const steps = process.argv[3];

// input as argument (npm start add -- --prompt="prompt" --steps=steps)


const ckptModel = arr.arrModel;

let ckptSD = ckptModel[2];
let folder = ckptSD === ckptModel[0] ? "protogen" : ckptSD === ckptModel[1] ? "f222" : ckptSD === ckptModel[2] ? "midjourney" : "anime";

const config = method.config
const ckptConfig = method.ckptConfig

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