import fs from "fs";
import path from "path";
import ConfigParser from "configparser";

export class OniRepo {

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
            create(path.join(this.oniDir, "branches"));
            create(path.join(this.oniDir, "objects"));
            create(path.join(this.oniDir, "refs"));

            create(path.join(`${this.oniDir}/refs`, "tags"));
            create(path.join(`${this.oniDir}/refs`, "heads"));

            // .oni/description
            write("description", "Edit this file to name the repository");

            // .oni/HEAD
            write("HEAD", "ref: refs/heads/master");

            // .oni/config
            createConfigFileParser().write(path.join(this.oniDir, "config"));

            console.log(`Repository created successfully.`);
        };

        const createConfigFileParser = () => {
            const cf = new ConfigParser();

            cf.addSection("core");
            cf.set("core", "repositoryformatversion", "0");
            cf.set("core", "filemode", "false");
            cf.set("core", "bare", "false");

            return cf;
        };

        const write = (_path, content, callback) => {
            const fullPath = path.join(this.oniDir, _path);

            fs.writeFile(fullPath, content, (err) => {
                if (!err && callback) {
                    callback();
                }
            });
        }
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
        if (!err && callback) {
            callback();
        }
    });
}