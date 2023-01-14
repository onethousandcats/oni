import {OniRepo} from "./repo.js";

export const del = (path) => {
    path = typeof path === 'string' ? path : process.cwd();

    const oniRepo = new OniRepo(path);
    oniRepo.delete();
}