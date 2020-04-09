import Item from '../util/item.js';
import Feature from './Feature.js';

export default class SlayerDropsTracker extends Feature {
    
    //TODO: First time setup

    constructor(SAA, config) {
        super(SAA, config);

        //TEMPORARY FIX REMOVE LATER!!!!
        if (config.isEnabled) {
            this.setupTriggers();
        }
    }

    setupTriggers() {
        this.SAA.announce('lol');

        chatTrigger = TriggerRegister.registerChat(this.onChat);
        this.triggers.push(
            chatTrigger
            //...
        );
    }

    onChat() {
        
    }

    //TEMPORARY FIX REMOVE LATER!!!!
    setEnabled(isEnabled) {
        super.setEnabled(isEnabled);
        if (this.config.isEnabled != isEnabled) {
            if (isEnabled) {
                this.setupTriggers();
            }
        }
    }


}