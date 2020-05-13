import CMessage from './util/chat/Message.js';
import SlayerDropsTracker from './features/SlayerDropsTracker.js';
import ChatManager from './util/chat/chatmanager.js';

export default class SkyblockAddonsAddons {
    features = [];
    inSkyblock = false;

    constructor(debug = false) {
        this.debug = debug;

        // Initializes chat system
        new ChatManager();

        new CMessage(
            '/div',
            'Loading Skyblock Addons^2',
            '',
        );

        this.config = JSON.parse(FileLib.read('SkyblockAddonsAddons', 'config.json'));

        new CMessage(
            'Initializing Features:'
        );

        //Initialize features
        this._addFeature(new SlayerDropsTracker(this, this.config.features.slayerDropsTracker));

        register('worldLoad', (e) => {
            this._testInSkyblock(10);
        });

        new CMessage(
            '',
            'Skyblock Addons^2 has sucessfully loaded!',
            '/div'
        );
    }

    _testInSkyblock(attempts, message) {
        setTimeout(() => {
            if (attempts > 0) {
                if (message == null) {
                    message = new CMessage('Not in Skyblock! [' + attempts + ']');
                } else {
                    message.editLine('Not in Skyblock! [' + attempts + ']')
                }
                if (this._isInSkyblock()) {
                    new CMessage('In Skyblock!');
                    this.setInSkyblock(true);
                    message.delete();
                } else {

                    this._testInSkyblock(--attempts, message);
                }
            } else if (attempts == 0) {
                this.setInSkyblock(false);
                message.delete();
            }
        }, 1000);
    }

    _isInSkyblock() {
        let hasMenu = Player.getInventory().getStackInSlot(8).getName().includes('SkyBlock Menu');
        let hasScoreboard = ChatLib.removeFormatting(Scoreboard.getTitle()) == 'SKYBLOCK';
        let inHypixel = Server.getIP().endsWith('hypixel.net');

        return inHypixel && (hasMenu || hasScoreboard);
    }

    setInSkyblock(inSkyblock) {
        //Activate features if in skyblock
        if (inSkyblock != this.inSkyblock) {
            this.features.forEach((feature) => {
                feature.setActive(inSkyblock);
            });
            this.inSkyblock = inSkyblock;
            new CMessage(
                'All features ' + (inSkyblock ? 'activated' : 'deactivated') + '!'
            );
        }
        return this;
    }

    _addFeature(...feature) {
        this.features.push(...feature);
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
