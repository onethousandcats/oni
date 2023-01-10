import path from "path";
import fs from "fs";
import {OniRepo} from "./oni.js";

export const init = () => {
    const oniRepo = new OniRepo(process.cwd());
    oniRepo.create();
}
