import { RedisClient } from "redis"
import { HashOperations } from "./HashOperations";

export interface Operations {
    conn: RedisClient;
}

export class ComfortRedis {
    conn: RedisClient;
    hash: HashOperations
    constructor(conn: RedisClient) {
        this.conn = conn;
        this.hash = new HashOperations(conn);
    }

    public keys(pattern: string): Promise<string[]> {
        return new Promise((res, rej) => {
            this.conn.keys(pattern, (err, result) => {
                if (err instanceof Error) { rej(err) }
                else { res(result) }
            })
        })
    }

    public del(key: string): Promise<number> {
        return new Promise((res, rej) => {
            this.conn.del(key, (err, result) => {
                if (err instanceof Error) { rej(err) }
                else { res(result) }
            })
        })
    }
    public get(key: string): Promise<any> {
        return new Promise((res, rej) => {
            this.conn.get(key, (err, result) => {
                if (err instanceof Error) { rej(err) }
                else { res(result) }
            })
        })
    }
    public set(key: string, data: string): Promise<string> {
        return new Promise((res, rej) => {
            this.conn.set(key, data, (err, result) => {
                if (err instanceof Error) { rej(err) }
                else { res(result) }
            })
        })   
    }
}