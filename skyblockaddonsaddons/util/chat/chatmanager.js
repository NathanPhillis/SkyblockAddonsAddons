import CMessage from "./Message";

export default class ChatManager {

    constructor() {
        register('chat', (e) => {
            e.setCanceled(true);
            new CMessage(ChatLib.getChatMessage(e, true), null, true);
        });
    }

    /*
    convert(message, event) {
        event.setCanceled(true);
        new CMessage(message);
    }
    */

}
