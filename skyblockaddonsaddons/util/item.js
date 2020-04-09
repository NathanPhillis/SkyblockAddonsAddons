export default class Item {

    static rarity = {
        COMMON: 0,
        UNCOMMON: 1,
        RARE: 2,
        EPIC: 3,
        LEGENDARY: 5,
        MYTHIC: 6,
        SPECIAL: 6
    };

    constructor(name, rarity) {
        //name must be in camelCase
        this.name = formatItemText(name);
        this.rarity = rarity;
    }

    getDisplayName() {
        switch(this.rarity) {
            case rarity.COMMON:
                return "&f" + this.name + "&f";
            case rarity.UNCOMMON:
                return "&a" + this.name + "&f";
            case rarity.RARE:
                return "&9" + this.name + "&f";
            case rarity.EPIC:
                return "&5" + this.name + "&f";
            case rarity.LEGENDARY:
                return "&e" + this.name + "&f";
            //Future rarity
            //case rarity.MYTHIC:
            //    return "" + this.name + "&f";
            case rarity.SPECIAL:
                return "&d" + this.name + "&f";
            default:
                return "&f" + this.name + "&f";
        }
    }

    static formatItemName(str){
        //RegEx witchcraft
        return str.match(/^[a-z]+|[A-Z][a-z]*/g).map(function(s){
            return s[0].toUpperCase() + s.substr(1).toLowerCase();
        }).join(' ');
    };

}