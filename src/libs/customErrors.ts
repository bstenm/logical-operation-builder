export class CorruptedStateError extends Error {
    constructor(id?: string) {
        super();
        this.name = 'CorruptedStateError';
        this.message = `Corrupted state at ${id}`;
        Object.setPrototypeOf(this, CorruptedStateError.prototype);
    }
}
