module.exports = class ResolveColor {
    /**
     * 
     * @param {string} color Embed color
     */
    static resolve(color) {
        if(typeof color !== "string") throw new Error("The color type must be a string");
        return parseInt(color.toUpperCase().replace("#", ""), 16);
    }
}