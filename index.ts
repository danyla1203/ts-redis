import { RedisClient } from "redis"

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
    public hgetall(key: string): Promise<any> {
        return new Promise((res, rej) => {
            this.conn.hgetall(key, (err: any, result: any) => {
                if (result instanceof Error) { rej(err) }
                else { res(result) }
            })
        })
    }
    public hmset(key: string, data: Object) {
        return new Promise((res, rej) => {
            let arrayedObj = Object.entries(data);
            let mixinArr: any[] = arrayedObj.map((el: [string, any]) => {
                mixinArr.push(el[0]);
                mixinArr.push(el[1]);
            })
            this.conn.hmset(key, ...mixinArr , (err: any, result: any) => {
                if (result instanceof Error) { rej(err) }
                else { res(result) }
            })
        })
    }
}

