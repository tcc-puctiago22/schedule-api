const crypto = require('crypto');

export default function randomUUID() {
    return  crypto.randomUUID();
}