import { getExistingRepo } from "./repo.js";
import chalk from "chalk";

export const check = () => {
    const existingRepo = getExistingRepo(process.cwd());

    if (existingRepo) {
        console.log(chalk.green(`You are currently in an ONI repo 🎊`));
        console.log(`Repo base at ${chalk.bgGreen(chalk.black(existingRepo.path))}`);
    }
    else {
        console.log(chalk.red(`Not currently inside an ONI repo. 😞`));
    }

}