class RagsInstance {
    constructor() {
        const args = process.argv.slice(2);

        this._help = false;

        this.cmd = args[0];
        this.params = args.slice(1);

        this.commands = [];
    }

    welcome = (welcome) => {
        this._welcome = welcome;
        return this;
    }

    usage = (usage) => {
        this._usage = usage;
        return this;
    }

    addCommand = (name, func) => {
        this.commands.push({name, func});
        return this;
    }

    help = () => {
        this._help = true;
        return this;
    }

    listCommands = () => {
        this.addCommand("list", this.list)
        return this;
    }

    list = () => {
        console.log(this.commands);
    }

    run = () => {
        const c = this.commands.find(c => c.name === this.cmd);

        if (c === undefined)
        {
            console.log(`${this._welcome}\n\n${this._usage}`);
            return this;
        }

        const params = getParams(c.func);

        if (params.length < this.params.length) {
            console.log(`Incorrect arguments`);
            return this;
        }

        c.func(...this.params);

        return this;
    }
}

const getParams = (func) => {
    const funcString = func.toString();
    const regEx = /\((.*)\)/;
    return funcString.match(regEx)[1].split(',');
}

export const rags = new RagsInstance();