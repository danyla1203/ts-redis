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

    private modifyResult(result: { [key:string]: any }): { [key:string]: string|number } {
        let modifiedResult: { [key:string]: string|number } = {};
        for(let column in result) {
            let tryMulti = result[column] * 1;
            if (!isNaN(tryMulti)) {
                modifiedResult[column] = parseInt(result[column]);
            } else {
                modifiedResult[column] = result[column];
            }
        }
        return modifiedResult;
    }
    public getall(key: string): Promise<any> {
        return new Promise((res, rej) => {
            this.conn.hgetall(key, (err, result) => {
                if (err instanceof Error) { 
                    rej(err) 
                } else {
                    let processedResult = this.modifyResult(result);
                    res(processedResult);
                }
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

    public setnx(
        key: string, 
        fieldName: string, 
        value: string
    ): Promise<number> {
        return new Promise((res, rej) => {
            this.conn.hsetnx(key, fieldName, value, (err, result) => {
                if (err instanceof Error) { rej(err) }
                else { res(result) }
            })
        })
    }
}