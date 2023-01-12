import fs from "fs";
import path from "path";
import ConfigParser from "configparser";
import {unzip, zip} from "./compression.js";
import {ObjectFactory} from "./objects.js";
import crypto from "crypto";

class OniRepo {

    constructor(_path) {
        this.path = _path;
        this.oniDir = path.join(_path, ".oni");
    }

    create = () => {
        if (exists(this.oniDir)) {
            console.log(`A repository already exists in this directory`);
            return;
        }

        create(this.oniDir, () => buildRepository());

        const buildRepository = () => {
            create(pathify("branches"));
            create(pathify("objects"));
            create(pathify("refs"));

            create(path.join(`${this.oniDir}/refs`, "tags"));
            create(path.join(`${this.oniDir}/refs`, "heads"));

            // .oni/description
            write(pathify("description"), "Edit this file to name the repository");

            // .oni/HEAD
            write(pathify("HEAD"), "ref: refs/heads/master");

            // .oni/config
            createConfigFileParser().write(path.join(this.oniDir, "config"));

            console.log(`Repository created successfully.`);
        };

        const pathify = (name) => {
            return path.join(this.oniDir, name);
        }

        const createConfigFileParser = () => {
            const cf = new ConfigParser();

            cf.addSection("core");
            cf.set("core", "repositoryformatversion", "0");
            cf.set("core", "filemode", "false");
            cf.set("core", "bare", "false");

            return cf;
        };
    };
}

// find an object in the repo
const findObject = (repo, name) => {
    return name;
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

        var oniClass = ObjectFactory(format);
        return new oniClass(repo, sizeAndContent[1]);
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

const write = (path, content, callback) => {
    fs.writeFile(path, content, (err) => {
        if (!err && callback) {
            callback();
        }
    });
}

const read = async(path) => {
    await fs.readFile(path, 'utf8');
}

const exists = (_path) => {
    try {
        fs.accessSync(_path);
        return true;
    } catch (err) {
        return false;
    }
}

const create = (_path, callback) => {
    fs.mkdir(_path, (err) => {
        if (!err && callback) {
            callback();
        }
    });
}

const stringToByteArray = (str) => {
    const result = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
        result[i] = str.charCodeAt(i);
    }
    return result;
}

export { OniRepo,
        create,
        exists,
        write,
        read,
        writeObject,
        readObject };