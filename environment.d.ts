declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string
            PREFIX: string
            OWNER_ID: number
            MONGO_URI: string
            BOT_INVITE: string
            SUPPORT_SERVER: string
            IMGUR_CLIENT_ID: string
            IMGUR_CLIENT_SECRET: string
        }
    }
}

export {}