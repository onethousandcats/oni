import { zip, unzip } from "../lib/compression.js";

test('compressed object decompresses', () => {
    const data = "Easy revenge";
    const zipped = zip(data);
    const unzipped = unzip(zipped);

    expect(data).toBe(unzipped);
});