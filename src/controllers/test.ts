// const debug = require('debug')('WebNJGIS: Debug');
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;
const fs = require('fs');
import * as unzip from 'unzip';
import { Buffer } from 'buffer';
import * as Promise from 'bluebird';
import * as _ from 'lodash';
import { cmpSolutionDB } from '../models/cmp-solution.model';

// const xml = "asdfasf"
// const doc = new dom().parseFromString(xml)
// const nodes = xpath.select("//title", doc)
// console.log(nodes[0].localName + ": " + nodes[0].firstChild.data)
// console.log("Node: " + nodes[0].toString())

const fpath = 'F:\\geomodelling\\webNJGIS_backend_ts\\dist\\upload\\geo-data\\5a0abb3cfaa10b56b4eb598d.zip';
const fpath2 = 'F:\\geomodelling\\webNJGIS_backend_ts\\dist\\upload\\geo-data\\5a0abb3cfaa10b56b4eb598d_2.zip';

const unzipPath = 'F:\\geomodelling\\webNJGIS_backend_ts\\dist\\upload\\geo-data\\5a0abb3cfaa10b56b4eb598d_2';
fs.readFile(fpath, (err, buf) => {
    const strbuf = buf.toString();
    console.log(strbuf);
    const newBuf = new Buffer(strbuf);
    fs.writeFile(fpath2, strbuf, {encoding: 'utf8'}, err => {
        if(err) {
            console.log(err);
        }
        else {
            const unzipExtractor = unzip.Extract({ path: unzipPath });
            fs.createReadStream(fpath2).pipe(unzipExtractor);
            unzipExtractor.on('error', err => {
                console.log(err);
            });
            unzipExtractor.on('close', () => {
                console.log('closed');
            });
        }
    });
});




export const testFunc = () => {
    const data = [];
    for (let i = 0; i < 1000; i++) {
        data.push({
            meta: new Date().getTime(),
            cfg: new Date().getTime()
        });
    }
    // Promise.map(data, cmpSolutionDB.insert, {concurrency: 5000})
    //     .then(rsts => {
    //         console.log(rsts);
    //     })
    //     .catch(console.log);
    console.log('finished!');
};

// const ASYNCS = [];
// for(let i=0;i<100000;i++) {
//     ASYNCS.push(i);
// }

// Promise.map(ASYNCS, function (async) {
//     return Promise.resolve(console.log(async));
// },{concurrency: 5000});

const a = {
    a: 1
};

const b = {
    b: 1
};

const c = {
    a: 2
};
let d = {};
d = {
    ...a,
    ...d
};
d = {
    ...b,
    ...d
};
console.log({
    ...c,
    ...d
});