import App from "./App"

export default class Listener {
    name: string
    client?: App

    constructor(options) {
        this.name = options.name
    }
    on() {}
}