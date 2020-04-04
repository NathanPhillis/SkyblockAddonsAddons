export default class Feature {
    
    triggers = [];

    constructor(SAA, config) {
        this.SAA = SAA;
        this.config = config;

        this.setupTriggers();
        this.setActive(false);
    }

    //Deprecated (do not call!)
    setupTriggers() {
        
    }

    //Trigger methods go here:

    //If the player is not in skyblock, we do not want the triggers active
    setActive(active) {
        this.active = active;
    }

    //Enable or disable the feature in config
    enable() {
        this.config.isEnabled = true;
    }

    disable() {
        this.config.isEnabled = false;
    }
    
    //Get config for saving
    getConfig() {
        return this.config;
    }

}