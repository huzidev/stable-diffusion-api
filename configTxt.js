const yargs = require("yargs");
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

// const ckptConfig = {
//     method: 'post',
//     url: 'http://127.0.0.1:7860/sdapi/v1/options',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     data: JSON.stringify({ "sd_model_checkpoint": ckptSD })
// };

module.exports = {
    config,
    // ckptConfig
}