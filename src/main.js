// browser or Node (WebSocket global / ws package)
const url = "wss://relay.damus.io";
const ws = new WebSocket(url);


ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  // msg[0] is the message type: "EVENT", "NOTICE", "EOSE", etc.
  console.log(msg);
};





// publish requires a signed event object (see nostr-tools example below)
import { generateSecretKey, getPublicKey, finalizeEvent } from 'nostr-tools/pure';

// 1) generate or load your secret key (hex)
const sk = generateSecretKey(); // or load from secure storage

// 2) derive the public key (hex)
const pk = getPublicKey(sk);

// 3) build an unsigned event object
const unsigned = {
  kind: 1,
  content: 'hello nostr (signed with pure)',
  created_at: Math.floor(Date.now() / 1000),
  tags: []
};

// 4) finalizeEvent will compute the id and signature using your secret key
const signed = finalizeEvent(unsigned, sk);

// signed now contains .id, .sig, and .pubkey (hex)
console.log(signed);
// send over WebSocket
ws.onopen = () => {
    console.log(`ws.readyState: ${ws.readyState}`);
  // subscribe: ["REQ", "<sub_id>", { "kinds": [1], "limit": 10 }]
//   ws.send(JSON.stringify(["REQ", "sub1", { "kinds": [1], "limit": 10 }]));
  ws.send(JSON.stringify(["EVENT", signed]));
};




// import { finalizeEvent, generateSecretKey, getPublicKey } from 'nostr-tools/pure'

// import { SimplePool, useWebSocketImplementation } from 'nostr-tools/pool';
// import WebSocket from 'ws';
// useWebSocketImplementation(WebSocket);

// console.log("Module loaded.");

// const pool = new SimplePool();
// const relays = [
//     "wss://relay.damus.io", 
//     "wss://relay.nostr.band", 
//     "wss://nostr.example.com/", 
//     "wss://relay.nostr.net"
// ];

// // let's query for one event that exists
// async function loadEvents() {
//     let event = await pool.get(
//         relays,
//         {
//             ids: ["992f22c643a137326ad0ee750556c422e7c360c9933b538fb7ae1f7a3355e731"],
//             // ids: [],
//         },
//     );

//     if (event) {
//         console.log('it exists indeed on this relay:', event)
//     }

//     // let's query for more than one event that exists
//     const events = await pool.querySync(
//         relays,
//         {
//             kinds: [1],
//             limit: 100
//         },
//     );

//     if (events) {
//         console.log('it exists indeed on this relay:', events)
//     }

// };

// loadEvents();




// let's publish a new event while simultaneously monitoring the relay for it
// let sk = generateSecretKey()
// let pk = getPublicKey(sk)

// pool.subscribe(
//   relays,
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
// await Promise.any(pool.publish(relays, signedEvent))

// relay.close()

