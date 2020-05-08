import CMessage from './util/chat/Message.js';
import SlayerDropsTracker from './features/SlayerDropsTracker.js';

export default class SkyblockAddonsAddons {
    features = [];
    inSkyblock = false;

    constructor(debug = false) {
        this.debug = debug;

        new CMessage(
            '/div',
            'Loading Skyblock Addons^2',
            '',
        );

        this.config = JSON.parse(FileLib.read('SkyblockAddonsAddons', 'config.json'));

        this.debugAnnounce('Initializing Features:');

        //Initialise features
        this._addFeature(new SlayerDropsTracker(this, this.config.features.slayerDropsTracker));

        register('worldLoad', (e) => {
            this._testInSkyblock(10);
        });

        this.debugAnnounce('').debugAnnounce('Skyblock Addons^2 has sucessfully loaded!').debugDivider();
    }

    _testInSkyblock(attempts) {
        setTimeout(() => {
            if (attempts > 0) {
                console.log(attempts);
                if (this._isInSkyblock()) {
                    this.setInSkyblock(true).announce('In Skyblock.');
                } else {
                    this.announce('Not in Skyblock.');
                    this._testInSkyblock(--attempts);
                }
            } else if (attempts == 0) {
                this.setInSkyblock(false);
            }
        }, 1000);
    }

    _isInSkyblock() {
        hasMenu = Player.getInventory().getStackInSlot(8).getName().includes('SkyBlock Menu');
        hasScoreboard = ChatLib.removeFormatting(Scoreboard.getTitle()) == 'SKYBLOCK';
        inHypixel = Server.getIP().endsWith('hypixel.net');

        return inHypixel && (hasMenu || hasScoreboard);
    }

    setInSkyblock(inSkyblock) {
        //Activate features if in skyblock
        if (inSkyblock != this.inSkyblock) {
            this.features.forEach((feature) => {
                feature.setActive(inSkyblock);
            });

            this.debugAnnounce('All features ' + (inSkyblock ? 'activated' : 'deactivated') + '!');
            this.inSkyblock = inSkyblock;
        }
        return this;
    }

    _addFeature(...feature) {
        this.features.push(...feature);
        return this;
    }

    announce(...lines) {
        for (line in lines) {
            console.log('SAA: ' + line);
        }

        //TODO: REWORK TO USE MESSAGES
        m = new Message('&c&lSAA:&f ');
        m.chat();
        return this;
    }

    debugAnnounce(text) {
        if (this.debug) {
            this.announce(text);
        }
        return this;
    }

    divider() {
        ChatLib.chat(ChatLib.getChatBreak());
        return this;
    }

    debugDivider() {
        if (this.debug) {
            this.divider();
        }
        return this;
    }

    error(error, ...obj) {
        console.error('SAA ERROR: ' + error, ...obj);
        ChatLib.chat('&c&lSAA ERROR:&f ' + error);
        return this;
    }
}
