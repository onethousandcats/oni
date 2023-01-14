import {OniRepo} from "./repo.js";
import chalk from "chalk";

export const cat = (file, type) => {
    console.log(`the file is ${chalk.green(file)} and the type is ${chalk.yellow(type)}`);
    const oniRepo = new OniRepo(file);
    const result = oniRepo.catFile(file, type);

    console.log(result);
}