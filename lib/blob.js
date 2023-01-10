import {OniObject} from "./object.js";

export class OniBlob extends OniObject {

    serialize = () => {
        return this.data;
    }

    deserialize = (data) => {
        this.data = data;
    }
}