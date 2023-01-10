import path from "path";
import fs from "fs";
import {OniRepo} from "./repo.js";

export const init = () => {
    const oniRepo = new OniRepo(process.cwd());
    oniRepo.create();
}
