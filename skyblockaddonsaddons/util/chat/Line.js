export default class Line {

    static lineNo = 0;

    content;
    id;

    constructor(content, id, noFormatting) {
        if (content.includes('/div')) {
            this.content = ChatLib.getChatBreak();
        } else if (content.includes('/error')) {
            console.error('SAA ERROR: ' + content);
            this.content = '&c&lSAA ERROR:&f ' + content.replace('/error', '');
        } else if (noFormatting) {
            this.content = content;
        } else {
            this.content = '&c&lSAA:&f ' + content;
        }
        if (id != null) {
            this.id = id;
        } else {
            this.id = Line.lineNo++;
        }
        console.log(this.id + ': ' + content);
    }

    delete() {
        ChatLib.clearChat(this.id);
        console.log('delete: ' + this.id)
    }

    getContent() {
        return this.content;
    }

    getId() {
        return this.id;
    }

}