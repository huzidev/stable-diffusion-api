const axios = require('axios');
const path = require('path');
const fs = require('fs');
const get = require('prompt-sync')();
const util = require('util');
const img = require("./img2img");
const upScale = require("./upScale");
const arr = require("./arrayVar");
const yargs = require('yargs');
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
let prompt = yargs.argv.prompt;
let steps = yargs.argv.steps;
let negative_prompt = yargs.argv.neg;
let cfg_scale = yargs.argv.cfg;

var data = JSON.stringify({
  prompt,
  steps,
  negative_prompt,
  cfg_scale,
  "sampler_name": "Heun",
  "batch_size": 1,
  "width": 512,
  "height": 512,
  "seed": -1,
});

const ckptModel = arr.arrModel;

let ckptSD = ckptModel[2];
let folder = ckptSD === ckptModel[0] ? "protogen" : ckptSD === ckptModel[1] ? "f222" : ckptSD === ckptModel[2] ? "midjourney" : "anime";



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