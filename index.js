import SDT from './features/SlayerDropsTracker.js';

class SkyblockAddonsAddons {

    features = [];
    inSkyblock = false;

    constructor(debug) {
        this.config = JSON.parse(FileLib.read('Skyblock Addons Addons','config.json'));;
        this.debug = debug;

        //Initialise features
        features.push(
            new SDT(this, this.config.features.slayerDropsTracker),
            //new...
        );

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
            
            
        }).setCriteria('Sending to server ${serverName}...');

        //Debug
        register('command', ()=>{
            if (feature[1].config.isEnabled) {
                feature[1].disable();
            } else {
                feature[1].enable();
            }
        }).setName('togglesdt');
    }

    setInSkyblock(inSkyblock) {
        //Activate features if in skyblock
        if (inSkyblock) {
            features.forEach(feature => {
                feature.active = true;
            });
        } else {
            features.forEach(feature => {
                feature.active = false;
            });
        }
        this.inSkyblock = inSkyblock;
    }

    announce(text) {
        ChatLib.chat('&c&lSAA:&f ' + text);
    }

}

export default new SkyblockAddonsAddons(true);