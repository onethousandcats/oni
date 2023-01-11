import fs from "fs";
import path from "path";
import ConfigParser from "configparser";

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

export { OniRepo, create, exists, write, read };