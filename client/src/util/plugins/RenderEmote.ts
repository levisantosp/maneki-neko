import { fillTextWithTwemoji } from 'node-canvas-with-twemoji-and-discord-emoji'

export default class RenderEmote {
  static async render(ctx, text: string, x: number, y: number) {
    return await fillTextWithTwemoji(ctx, text, x, y)
  }
}