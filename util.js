const fsp = require('node:fs/promises');
const { Buffer } = require('node:buffer');

let randomDataStore = Buffer.alloc(50_000_000);
let zipBombBuffer;

async function init() {
    // Generate a bunch of random data by
    console.log('Generating random data...');
    const fd = await fsp.open('/dev/random');
    await fd.read({
        buffer: randomDataStore,
        // length: size,
        // offset: 0,
        // position: 0,
    });
    await fd.close();
    console.log('Finished generating random data.');

    // Read zip bomb buffer
    if (process.env.BOMB) {
        module.exports.zipBombBuffer = await fsp.readFile('10GB.gz');
        console.log('Loaded Zip Bomb Buffer.');
    }
}
init();

function randData(len = randomDataStore.length) {
    const randIndex = Math.floor(Math.random() * randomDataStore.length - len - 1);
    const sb = randomDataStore.subarray(randIndex, randIndex + len);
    return sb.toString('base64');
}

module.exports = {
    randData,
    zipBombBuffer,
};
