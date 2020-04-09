import SlayerDropsTracker from './features/SlayerDropsTracker.js';

export default class SkyblockAddonsAddons {

    features = [];
    inSkyblock = false;

    constructor(debug = false) {
        if (debug) {
            ChatLib.chat(ChatLib.getChatBreak());
            this.announce('Loading Skyblock Addons^2!')
                .announce('');
        }

        this.config = JSON.parse(FileLib.read('SkyblockAddonsAddons','config.json'));;
        this.debug = debug;
        

        if (debug) {
            this.announce('Initializing Features:');
        }
        //Initialise features
        this.addFeature(
            new SlayerDropsTracker(this, this.config.features.slayerDropsTracker)
        );
        
        if (debug) {
            this.announce('')
                .announce('Skyblock Addons^2 has sucessfully loaded!');
            ChatLib.chat(ChatLib.getChatBreak());
        }

        register('worldLoad',()=>{
            //Wait for scoreboard to load
            setTimeout(()=>{
                //Check if in skyblock
                if ((ChatLib.removeFormatting(Scoreboard.getTitle()) == 'SKYBLOCK' && Server.getIP().endsWith('hypixel.net'))) {
                    this.setInSkyblock(true)
                        .announce('In Skyblock.');
                } else {
                    this.setInSkyblock(false)
                        .announce('Not in Skyblock');
                }
            },500);
        });
    }

    setInSkyblock(inSkyblock) {
        //Activate features if in skyblock
        if (inSkyblock != this.inSkyblock) {
            this.features.forEach((feature)=>{
                feature.setActive(inSkyblock);
            });

            if (this.debug) {
                this.announce('All features ' + ( inSkyblock ? 'activated' : 'deactivated' ) + '!');
            }
            this.inSkyblock = inSkyblock;
        } 
        return this;
    }

    addFeature(...feature) {
        this.features.push(...feature);
        return this;
    }

    announce(text) {
        console.log('SAA: ' + text);
        ChatLib.chat('&c&lSAA:&f ' + text);
        return this;
    }

    error(error, ...obj) {
        console.error('SAA ERROR: ' + error, ...obj);
        ChatLib.chat('&c&lSAA ERROR:&f ' + error);
        return this;
    }

}