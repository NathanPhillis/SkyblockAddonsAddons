import CMessage from "../util/chat/Message";

export default class Feature {
    triggers = [];

    constructor(SAA, config) {
        this.SAA = SAA;
        this.config = config;
        this.active = false;

        //TEMPORARY FIX REMOVE COMMENT LATER!!!!!!!!!!!!!
        /*
        //Setup if feature is enabled.
        if (config.isEnabled) {
            this.setupTriggers();
        }
        */

        //Debug
        new CMessage(config.name + ': ' + (config.isEnabled ? '&aOn' : '&cOff'));
    }

    //Override this!
    setupTriggers() { }

    //Trigger methods go here:

    //Rewrite to use inSkyblock!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    //If the player is not in skyblock, we do not want the triggers active
    setActive(active) {
        // Don't activate if the feature is disabled
        if (this.config.isEnabled && this.active != active) {
            //Register or unregister each trigger
            this.triggers.forEach((trigger) => {
                if (active) {
                    trigger.register();
                } else {
                    trigger.unregister();
                }
            });
            this.active = active;

            new CMessage(this.config.name + (active ? ' activated!' : ' deactivated!'));
        }
    }

    //Enable or disable the feature in config
    setEnabled(isEnabled) {
        if (this.config.isEnabled != isEnabled) {
            //TEMPORARY FIX REMOVE COMMENT LATER!!!!!!!!!!!!!
            /*
            if (isEnabled) {
                this.setupTriggers();
            }
            */

            this.setActive(isEnabled);
            this.config.isEnabled = isEnabled;

            new CMessage(this.config.name + (isEnabled ? ' enabled!' : ' disabled!'));
        } else {
            this.SAA.error(this.config.name + ' is already ' + (isEnabled ? 'enabled!' : 'disabled!'), this);
        }
    }
}
