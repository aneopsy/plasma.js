export default class Method {
    name: string;
    call: string;
    params: any;
    inputFormatter: any;
    outputFormatter: any;
    requestManager: any;

    constructor(options = <any>{}) {
        if (!options.call || !options.name) {
            throw new Error(
                'When creating a method you need to provide at least the "name" and "call" property.'
            );
        }

        options.params = options.params || 0;
        if (typeof options.params !== 'number') {
            throw new Error('Invalid params field');
        }

        if (options.requestManager) {
            this.setRequestManager(options.requestManager);
        }

        this.name = options.name;
        this.call = options.call;
        this.params = options.params;
        this.inputFormatter = options.inputFormatter;
        this.outputFormatter = options.outputFormatter;
    }

    setRequestManager(requestManager: any) {
        this.requestManager = requestManager;
    }

    async send(...args) {
        const params = this.formatInput(args)
        this.validateArgs(params)

        return this.requestManager.send({
            method: this.call,
            params: params
        })
    }

    validateArgs(args: any): any {
        if (args.length !== this.params) {
            throw new Error(
                `Invalid number of parameters for ${this.call}. Got ${
                args.length
                }, expected ${this.params}`
            )
        }
    }

    formatInput(args: any): any {
        if (!this.inputFormatter) {
            return args
        }

        return this.inputFormatter.map((formatter, index) => {
            return formatter ? formatter.call(this, args[index]) : args[index]
        })
    }

    formatOutput(result: any): any {
        if (Array.isArray(result)) {
            return result.map(r => {
                return this.outputFormatter && r ? this.outputFormatter(r) : r
            })
        }

        return this.outputFormatter && result
            ? this.outputFormatter(result)
            : result
    }
}
