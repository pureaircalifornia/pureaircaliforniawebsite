import fs from 'node:fs';import sharp from 'sharp';
const files=JSON.parse(fs.readFileSync('../docs/stillness-review/archive-index.json','utf8'));
const selections=[[17,'yosemite-stars'],[18,'trees-night'],[20,'cloud-sea'],[5,'living-forest'],[7,'mountain-air']];
const records=[];for(const [i,name] of selections){for(const width of [640,1440,1920])await sharp(files[i]).resize({width,withoutEnlargement:true}).webp({quality:86}).toFile(`public/images/breath/${name}-${width}.webp`);records.push({name,source:files[i]});}fs.writeFileSync('../docs/stillness-review/assets.json',JSON.stringify(records,null,2));
