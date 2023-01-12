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

export { OniObject };