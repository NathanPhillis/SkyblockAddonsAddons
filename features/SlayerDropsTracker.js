import Item from '../util/item.js';
import Feature from './Feature.js';

export default class SlayerDropsTracker extends Feature {
    
    //TODO: First time setup

    constructor(SAA, config) {
        super(SAA, config);
    }

    setupTriggers() {
        if (this.config.isEnabled) {
            chatTrigger = TriggerRegister.registerChat(this.onChat);

            this.triggers.push(
                chatTrigger,
                //...
            );
        }
    }

    onChat() {

    }

    setActive(active) {
        super.setActive(active);
        this.SAA.announce(active);
        if (active) {
            this.triggers.forEach(trigger=>{
                trigger.register();
            });
        } else {
            this.triggers.forEach(trigger=>{
                trigger.unregister();
            });
        }
    }

    enable() {
        super.enable();

        this.chatTrigger.register();
        if (this.SAA.debug) {
            this.SAA.announce('Slayer Drop Tracking Enabled.');
        }
    }

    disable() {
        super.disable();

        this.chatTrigger.unregister();
        if (this.SAA.debug) {
            this.SAA.announce('Slayer Drop Tracking Disabled.');
        }
    }
}