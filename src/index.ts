import Render from "./Render";
import { createCanvas, registerFont } from "canvas";
import { Option } from "./@types";
import fs from "fs";

const top = "ああああああ";
const bottom = "いいいいい"

const option: Option = {
  hoshii: false,
  noalpha: true,
  rainbow: false,
  imgtype: "jpeg",
  single: false,
  debug: false
}

registerFont("./src/notobk-subset.otf", {family: "notobk"});
registerFont("./src/notoserifbk-subset.otf", {family: "notoserifbk"});

const canvas = new Render(createCanvas(3840,1080),option);

if(!option.single){
  canvas.drawTop(top,option.rainbow);

  if(!option.hoshii){
    canvas.drawBottom(bottom,null,option.rainbow);
  }else{
    canvas.drawImage();
  }
}else{
  if(top){
    canvas.drawTop(top,option.rainbow);
  }else{
    canvas.drawBottom(bottom,null,option.rainbow);
  }
}

canvas.createBuffer(option.imgtype,(data: Buffer)=>{
   fs.writeFile(`output.${option.imgtype}`,data,(err: Error | null)=>{
    if(err){
      console.error("画像保存中にエラーが発生しました:",err);
    }else{
      console.log("画像が正常に保存されました");
    }
  });
},80);