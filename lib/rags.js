class RagsInstance {
    constructor() {
        const args = process.argv.slice(2);

        this.welcome = undefined;
        this.usage = undefined;
        this.cmd = args[0];
        this.params = args.slice(1);

        this.commands = [];
    }

    setWelcome(welcome) {
        this.welcome = welcome;
        return this;
    }

    setUsage(usage) {
        this.usage = usage;
        return this;
    }

    addCommand(name, func) {
        this.commands.push({name, func});
        return this;
    }

    listCommands() {
        console.log(this.commands);
        return this;
    }

    run() {
        var c = this.commands.find(c => c.name === this.cmd);

        if (c === undefined) {
            console.log(`${this.welcome}\n\n${this.usage}`);
            return this;
        }

        c.func();

        return this;
    }
}

export const rags = new RagsInstance();