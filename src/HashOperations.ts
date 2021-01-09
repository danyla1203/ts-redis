import { Operations } from ".";
import { RedisClient } from "redis";

export class HashOperations implements Operations {
    conn: RedisClient;
    constructor(redis: RedisClient) {
        this.conn = redis
    }
    public get(hashKey: string, field: string): Promise<any> {
        return new Promise((res, rej) => {
            this.conn.hget(hashKey, field, (err, result) => {
                if (err instanceof Error) { rej(err) }
                else { res(result) }
            })
        })
    }
    public getall(key: string): Promise<any> {
        return new Promise((res, rej) => {
            this.conn.hgetall(key, (err, result: any) => {
                if (err instanceof Error) { rej(err) }
                else { res(result) }
            })
        })
    }

    public set(hashKey: string, key: string, value: any) {
        return new Promise((res, rej) => {
            this.conn.hset(hashKey, key, value, (err, result) => {
                if (err instanceof Error) { rej(err) }
                else { res(result) }
            })
        })
    }
    public mset(key: string, data: Object): Promise<string> {
        return new Promise((res, rej) => {
            let arrayedObj = Object.entries(data);
            let mixinArr: any[] = [];
            arrayedObj.map((el: [string, any]) => {
                mixinArr.push(el[0]);
                mixinArr.push(el[1]);
            })
            this.conn.hmset(key, ...mixinArr , (err: any, result: string) => {
                if (err instanceof Error) { rej(err) }
                else { res(result) }
            })
        })
    }
}