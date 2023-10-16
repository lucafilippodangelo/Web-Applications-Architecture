export {}

export interface IUser {
    id: string
}

declare global {
    namespace Express {
        export interface Request {
            user?: IUser
        }
    }
}