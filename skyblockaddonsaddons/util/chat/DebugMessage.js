import CMessage from './Message';

export default class CDebugMessage extends CMessage {
    constructor(debug, lines) {
        if (debug) {
            super(lines);
        }
    }
}
