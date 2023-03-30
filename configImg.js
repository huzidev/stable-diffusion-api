module.exports.imgToimg = function imgToimg(respImage, fileName) {
    var imgToimgData = JSON.stringify({
        "init_images": respImage,
        "prompt": "Winter season",
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
}