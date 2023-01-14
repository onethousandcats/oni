import {readObject, writeObject} from "../lib/repo.js";
import { OniBlob } from "../lib/blob.js";

test('object is written correctly', () => {
    const blob = new OniBlob(undefined, "This is a file with data");
    const sha = writeObject(blob);

    const content = readObject(undefined, sha);

    expect(blob.data).toBe("This is a file with data");
    expect(sha).toBe("c7c00ce2b7b697fd073fbd21993901a939981d14");
});