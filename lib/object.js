export class OniObject {

    constructor(repo, data) {
        this.repo = repo;

        if (!data) {
            deserialize(data);
        }

        const serialize = () => {
            throw { name: "NotImplementedError" };
        }

        const deserialize = () => {
            throw { name: "NotImplementedError" };
        }
    }
}

// read an object from the repo with the matching sha
const read = (repo, sha) => {
    const path = path.join(repo.oniDir, "objects", sha.slice(0, 2), sha.slice(2));
};