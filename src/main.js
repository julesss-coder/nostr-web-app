import { finalizeEvent, generateSecretKey, getPublicKey } from 'nostr-tools/pure'

import { SimplePool } from 'nostr-tools/pool';

console.log("Module loaded.");

const pool = new SimplePool();
const relays = ["wss://relay.damus.io", "wss://relay.nostr.band"];

// let's query for one event that exists
async function loadEvents() {
    const event = await pool.get(
        relays,
        {
            ids: ['d7dd5eb3ab747e16f8d0212d53032ea2a7cadef53837e5a6c66d42849fcb9027'],
        },
    );

    if (event) {
        console.log('it exists indeed on this relay:', event)
    }

    // let's query for more than one event that exists
    const events = await pool.querySync(
        relays,
        {
            kinds: [1],
            limit: 10
        },
    );

    if (events) {
        console.log('it exists indeed on this relay:', events)
    }

};

loadEvents();




// // let's publish a new event while simultaneously monitoring the relay for it
// let sk = generateSecretKey()
// let pk = getPublicKey(sk)

// pool.subscribe(
//   ['wss://a.com', 'wss://b.com', 'wss://c.com'],
//   {
//     kinds: [1],
//     authors: [pk],
//   },
//   {
//     onevent(event) {
//       console.log('got event:', event)
//     }
//   }
// )

// let eventTemplate = {
//   kind: 1,
//   created_at: Math.floor(Date.now() / 1000),
//   tags: [],
//   content: 'hello world',
// }

// // this assigns the pubkey, calculates the event id and signs the event in a single step
// const signedEvent = finalizeEvent(eventTemplate, sk)
// await Promise.any(pool.publish(['wss://a.com', 'wss://b.com'], signedEvent))

// relay.close()

