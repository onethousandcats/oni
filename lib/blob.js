import { OniObject } from "./object.js";

export class OniBlob extends OniObject {
    constructor(repo, data) {
        super(repo, data);
        this.format = "blob";
    }

    serialize() {
        return this.data;
    }

    deserialize(data) {
        this.data = data;
    }
}