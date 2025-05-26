export function initPriceSocket(onChange: (id: string, delta: number) => void) {
  // TODO: replace with real websocket
}

export function sendPush(title: string, body: string) {
  // TODO: use Web Push API
  console.log('push', title, body);
}
