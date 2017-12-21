/**
 * 计算节点
 */

import { Mongoose } from './mongoose.base';
import * as mongoose from 'mongoose';
import { ResourceSrc } from './resource.enum';

class ComputingNodeDB extends Mongoose {
    constructor() {
        const collectionName = 'Computing_Node';
        const schema = {
            host: String,
            port: String,
            auth: mongoose.Schema.Types.Mixed
        };

        super(collectionName, schema);
    }
}

export const computingNodeDB = new ComputingNodeDB();

export class ComputingNode {
    _id?: any;
    host: string;
    port: string;
    auth: {
        nodeName: string,
        token: string,
        src: ResourceSrc
    }
}