import mock from 'mock-fs';
import glob from 'glob';
import path from "path";
import {listFiles, read} from '../lib/repo.js'
import { init } from "../lib/init.js";

describe('repo tests', () => {

    const basePath = `${process.cwd()}/testFolder/`;

    beforeAll(() => {
        mock ({
            'testFolder': {
                'testFile': 'It is a tale, Told by an idiot, full of sound and fury,'
            },
        });
    });

    afterAll(() => {
        mock.restore();
    });

    test('read a file', async () => {
        const result = await read(path.join(basePath, 'testFile'));
        expect(result.split(' ')[0]).toBe('It');
    });

    test('init', () => {
        const files = listFiles(basePath);
        console.log(files);
    })
});
