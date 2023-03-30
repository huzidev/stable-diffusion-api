const config = {
    method: 'post',
    url: 'http://127.0.0.1:7860/sdapi/v1/txt2img',
    headers: {
        'Content-Type': 'application/json'
    },
    data: data
};

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
    ckptConfig
}