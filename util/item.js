export default class Item {

    static rarities = {
        COMMON: 0,
        UNCOMMON: 1,
        RARE: 2,
        EPIC: 3,
        LEGENDARY: 5,
        SPECIAL: 6
    };

    constructor(name, rarity) {
        this.name = formatItemText(name);
        this.rarity = rarity;
    }

    getDisplayName() {
        switch(this.rarity) {
            case rarities.COMMON:
                return "&f" + this.name + "&f";
            case rarities.UNCOMMON:
                return "&a" + this.name + "&f";
            case rarities.RARE:
                return "&9" + this.name + "&f";
            case rarities.EPIC:
                return "&5" + this.name + "&f";
            case rarities.LEGENDARY:
                return "&e" + this.name + "&f";
            case rarities.SPECIAL:
                return "&d" + this.name + "&f";
            default:
                return "&f" + this.name + "&f";
        }
    }

    static formatItemText(str){
        return str.match(/^[a-z]+|[A-Z][a-z]*/g).map(function(s){
            return s[0].toUpperCase() + s.substr(1).toLowerCase();
        }).join(' ');
    };

}