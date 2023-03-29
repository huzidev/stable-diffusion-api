# Stable Diffusion API

This Node scirpt will runs the stable diffusion as API

## Steps

1: Enable set COMMANDLINE_ARGS as set COMMANDLINE_ARGS=--api at webui-user.bat file in root folder of Stable diffusion\
2: Run Stable diffusion webui-user.bat file\
3: Now run the node script accordingly by taking the parameters as input or as arguments\
4: Taking parameters as Arguments the npm command EX: npm start add -- --prompt="anime character" --steps=20 --negative_prompt="disfigured" --cfg_scale=10\
4: Taking parameters as input EX: npm start > prompt:anime character > steps: 20\

OR simply manipulate the script accordingly by going to http://127.0.0.1:7860/docs where multiples API reference are present