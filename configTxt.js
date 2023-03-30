// const get = require('prompt-sync')();
const yargs = require("yargs");
const arr = require("./arrayVar");

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

const config = {
    method: 'post',
    url: 'http://127.0.0.1:7860/sdapi/v1/txt2img',
    headers: {
        'Content-Type': 'application/json'
    },
    data: data
};

const ckptModel = arr.arrModel;

let ckptSD = ckptModel[3];
let folder = ckptSD === ckptModel[0] ? "protogen" : ckptSD === ckptModel[1] ? "f222" : ckptSD === ckptModel[2] ? "midjourney" : "anime";

const ckptConfig = {
    method: 'post',
    url: 'http://127.0.0.1:7860/sdapi/v1/options',
    headers: {
        'Content-Type': 'application/json'
    },
    data: JSON.stringify({ "sd_model_checkpoint": ckptSD })
};

module.exports = {
    config,
    ckptConfig,
    ckptSD,
    folder
}