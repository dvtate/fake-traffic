const fsp = require('node:fs/promises');
const { Buffer } = require('node:buffer');

let randomDataStore = Buffer.alloc(500000);

async function init() {
    // Generate a bunch of random data by
    console.log('generating random data...');
    const fd = await fsp.open('/dev/random');
    await fd.read({
        buffer: randomDataStore,
        // length: size,
        // offset: 0,
        // position: 0,
    });
    await fd.close();
    console.log('finished generating random data...');
}
init();

function randData(len) {
    const randIndex = Math.floor(Math.random() * randomDataStore.length - len - 1);
    const sb = randomDataStore.subarray(randIndex, randIndex + len);
    return sb.toString('base64');
}

module.exports = {
    randData,
};