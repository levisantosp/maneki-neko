const { fillTextWithTwemoji } = require('node-canvas-with-twemoji-and-discord-emoji')

module.exports = class RenderEmote {
    static async render(ctx, text, x, y) {
        return await fillTextWithTwemoji(ctx, text, x, y)
    }
}