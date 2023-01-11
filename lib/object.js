import crypto from 'crypto';
import path from 'path';
import { write, read } from './repo.js';
import { zip, unzip } from "./compression.js";

class OniObject {
    constructor(repo, data) {
        this.repo = repo;

        if (data) {
            this.deserialize(data);
        }
    }

    serialize() {
        throw { name: "NotImplementedError" };
    }

    deserialize(data) {
        throw { name: "NotImplementedError" };
    }
}

// write an object to the repo
const writeObject = (obj) => {
    const data = obj.serialize();

    // create data byte array with header
    const result = stringToByteArray(`${obj.format} ${data.length}\x00${data}`);

    // hash
    const sha = crypto.createHash('sha1').update(result).digest('hex');

    if (obj.oniDir) {
        const path = path.join(obj.oniDir, "objects", sha.slice(0, 2), sha.slice(2));

        // write the file
        write(obj.oniDir, zip(sha));
    }

    return sha;
}

// read an object from the repo with the matching sha
const readObject = (repo, sha) => {
    if (!repo || !repo.oniDir) {
        console.log(`Oni repository not found`);
        return;
    }

    const _path = path.join(repo.oniDir, "objects", sha.slice(0, 2), sha.slice(2));

    if (_path) {
        const contents = unzip(read(_path)).split(/(?<=^\S+)\s/);

        const format = contents[0];
        const sizeAndContent = contents[1].split('\x00');

        const size = parseInt(sizeAndContent[0]);

        if (size != sizeAndContent[1].length) {
            throw { name: "FileException", message: `Badly formed objected ${sha}: incorrect length` };
        }

        // const classType = formatToClassType(format);
        //
        // return new classType(repo, sizeAndContent[1]);
    }
}

// const formatToClassType = (format) => ({
//     "blob": OniBlob
// })[format]

const stringToByteArray = (str) => {
    const result = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
        result[i] = str.charCodeAt(i);
    }
    return result;
}

export { OniObject, writeObject, readObject };