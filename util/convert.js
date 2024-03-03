import path from "path";
import fs from "fs";

function convert(headImg){
    const dir = path.join('./public/', headImg)
    let base64 = fs.readFileSync(dir, 'base64')
    return base64
}
export default convert