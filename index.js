import SDT from './features/SlayerDropsTracker.js';

class SkyblockAddonsAddons {

    features = [];
    inSkyblock = false;

    constructor(debug) {
        ChatLib.chat(ChatLib.getChatBreak());
        this.announce('Loading Skyblock Addons^2!')
        this.announce('');

        this.config = JSON.parse(FileLib.read('SkyblockAddonsAddons','config.json'));;
        this.debug = debug;
        

        this.announce('Initializing Features:');
        //Initialise features
        this.addFeature(
            new SDT(this, this.config.features.slayerDropsTracker)
        );

        this.announce('');
        

        register('worldLoad',()=>{
            //Wait for scoreboard to load
            setTimeout(()=>{
                //Check if in skyblock
                if ((ChatLib.removeFormatting(Scoreboard.getTitle()) == 'SKYBLOCK' && Server.getIP().endsWith('hypixel.net'))) {
                    this.setInSkyblock(true);
                } else {
                    this.setInSkyblock(false);
                }
            },50);
        });

        this.announce('Skyblock Addons^2 has sucessfully loaded!');
        ChatLib.chat(ChatLib.getChatBreak());
    }

    setInSkyblock(inSkyblock) {
        //Activate features if in skyblock
        if (inSkyblock) {
            this.features.forEach(feature => {
                feature.setActive(true);
            });
        } else {
            this.features.forEach(feature => {
                feature.setActive(false);
            });
        }
        this.inSkyblock = inSkyblock;
    }

    addFeature(...feature) {
        Array.prototype.push.apply(feature, this.features);
    }

    announce(text) {
        ChatLib.chat('&c&lSAA:&f ' + text);
    }

}

export default new SkyblockAddonsAddons(true);