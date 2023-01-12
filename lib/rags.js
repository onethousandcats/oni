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
        console.log(this.commands);
        console.log();
        return this;
    }

    run = () => {
        const c = this.commands.find(c => c.name === this.cmd);
        if (c === undefined)
        {
            console.log(`${this._welcome}\n\n${this._usage}`);
            return this;
        }
        c.func(this.params);

        return this;
    }
}

export const rags = new RagsInstance();