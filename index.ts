import { RedisClient } from "redis";

export class ComfortRedis {
    conn: RedisClient;
    constructor(conn: RedisClient) {
        this.conn = conn;
    }

    public keys(pattern: string): Promise<string[]> {
        return new Promise((res, rej) => {
            this.conn.keys(pattern, (err, result) => {
                if (result instanceof Error) { rej(err) }
                else { res(result) }
            })
        })
    }
    public hgetall(key: string): Promise<{ [key:string]: any }> {
        return new Promise((res, rej) => {
            this.conn.hgetall(key, (err, result) => {
                if (result instanceof Error) { rej(err) }
                else { res(result) }
            })
        })
    }
    
}

