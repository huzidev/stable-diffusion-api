let arrModel = [
    "protogenX34Photorealism_1.safetensors [44f90a0972]",
    "f222.safetensors [f300684443]",
    "mdjrny-v4.ckpt [5d5ad06cc2]",
    "EmisAnime.ckpt [39ee30561f]"
];

let keyOfImg = ["prompt", "denoising_strength", "seed", "height", "width", "sampler_name", "cfg_scale", "steps", "restore_faces"];

let keyOfTxt = ["prompt", "negative_prompt", "seed", "height", "width", "sampler_name", "cfg_scale", "steps", "restore_faces"];

module.exports = {
    arrModel,
    keyOfImg,
    keyOfTxt
}