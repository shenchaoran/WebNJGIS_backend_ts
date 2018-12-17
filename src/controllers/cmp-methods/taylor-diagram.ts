import { TaskModel, DataRefer, GeoDataModel, UDXSchema, CmpState } from '../../models';
import { ObjectID, ObjectId } from 'mongodb';
import CmpMethod from './cmp-base';
import * as Bluebird from 'bluebird';
import * as Papa from 'papaparse';
import { setting } from '../../config/setting';
import * as path from 'path';
import * as child_process from 'child_process';
const fs = Bluebird.promisifyAll(require('fs'));
import * as _ from 'lodash';

export default class TaylorDiagram extends CmpMethod {
    scriptPath
    constructor(
        public dataRefers: DataRefer[], 
        public schemas: UDXSchema[], 
        public regions,
        public taskId, 
        public cmpObjIndex, 
        public methodIndex,
    ) {
        super(dataRefers, schemas, regions, taskId, cmpObjIndex, methodIndex)
        this.scriptPath = path.join(__dirname, '../../py-scripts/taylor-diagram.py')
        this.cmpMethodName = `taylor-diagram`;
    }

    public async start() {
        let variables = [],
            ncPaths = [],
            markerLabels = [],
            outputName = new ObjectId().toHexString() + '.png',
            output = path.join(setting.geo_data.path, outputName);
        await Bluebird.map(this.dataRefers, async dataRefer => {
            let geoData = await GeoDataModel.findOne({ _id: dataRefer.value });
            let fpath = path.join(setting.geo_data.path, geoData.meta.path);
            variables.push(dataRefer.field)
            ncPaths.push(fpath)
            markerLabels.push(dataRefer.msName)
        });

        let interpretor = 'python',
            argv = [
                this.scriptPath,
                `--variables=${JSON.stringify(variables)}`,
                `--ncPaths=${JSON.stringify(ncPaths)}`,
                `--markerLabels=${JSON.stringify(markerLabels)}`,
                `--output=${output}`,
            ],
            onSucceed = async stdout => {
                this.result = { 
                    state: CmpState.FINISHED_SUCCEED,
                    imgPrefix: outputName,
                    ext: '[".png"]',
                }
            };
        return super._start(interpretor, argv, onSucceed)
    }
}