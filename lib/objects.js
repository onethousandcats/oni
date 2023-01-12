import {OniBlob} from "./blob.js";

export const ObjectFactory = (format) => {
    return formatToClassType(format);
}

const formatToClassType = (format) => ({
    "blob": OniBlob,
})[format];