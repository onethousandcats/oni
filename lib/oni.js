import fs from "fs";
import path from "path";

export class OniRepo {

    constructor(_path) {
        this.path = _path;
        this.oniFile = path.join(_path, ".oni");
    }

    create = () => {
        if (exists(this.oniFile)) {
            console.log(`A repository already exists in this directory`);
            return;
        }

        create(this.oniFile, () => buildRepository());

        const buildRepository = () => {
            console.log(`Repository created successfully.`);
        };
    };
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
        if (!err) {
            callback();
        }
    });
}