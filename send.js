const util = require('./util');

const dest = process.argv[2];
if (!dest) {
    console.log('missing destination url.\n Exiting...');
    process.exit(1);
}
console.log('Sending data to ', dest);

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function makeRequests() {
    for (;;) {
        // Intentionally not using Promise.all
        for (let i = 0; i < 20000; i++) {
            const r = await fetch(dest, {
                method: 'POST',
                body: util.randData(50000),
            });
            const str = await r.text();
        }

        // Take a break every so often
        await delay(1000 * 60 * 1);
    }
}

// Run daemon
setTimeout(makeRequests, 1000*5);