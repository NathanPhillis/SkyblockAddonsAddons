export default class CMessage {
    lines = [];
    messages = [];

    constructor(...lines) {
        this.lines = lines.map((line) => {
            if (line != '/div') {
                '&c&lSAA:&f ' + line;
            } else {
                line = ChatLib.getChatBreak();
            }
        });
        this.lines.forEach((line, i) => {
            console.log(line);
            this.messages[i] = new Message(line);
        });
        this.messages.forEach((message) => {
            message.chat();
        });
    }

    edit(replacement, line) {
        lines[line] = replacement;
        this.message.edit(lines);
    }

    replace(replacement) {
        lines = replacement;
        this.message.edit(lines);
    }
}
