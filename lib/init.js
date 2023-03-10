import {OniRepo} from "./repo.js";

export const init = (path) => {
    path = typeof path === 'string' ? path : process.cwd();

    const oniRepo = new OniRepo(path);
    oniRepo.create();
}
