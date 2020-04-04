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

    //If the player is not in skyblock, we do not want the triggers active
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

    //Enable or disable the feature in config
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