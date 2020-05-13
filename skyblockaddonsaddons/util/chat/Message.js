import Line from "./Line";

export default class CMessage {
    lines = [];
    messages = [];

    constructor(...lines) {
        lines.forEach((content, i) => {
            this.lines[i] = new Line(content);
            this.messages[i] = new Message(this.lines[i].getContent());
            this.messages[i].setChatLineId(this.lines[i].getId());
        });
        this._write();
    }

    _write() {
        this.messages.forEach((message) => {
            message.chat();
        });
        return this;
    }

    _setContent(replacement, index) {
        this.lines[index] = new Line(replacement, this.lines[index].getId());
        this.messages[index] = new Message(this.lines[index].getContent());
        this.messages[index].setChatLineId(this.lines[index].getId());
        return this;
    }

    editLine(replacement, index = 0) {
        this._setContent(replacement, index)
            ._write();
        return this;
    }

    edit(replacement) {
        replacement.forEach((repl, i) => {
            this._setContent(repl, i);
        });
        this._write();
        return this;
    }

    deleteLine(index) {
        this.lines[index].delete();
        this.lines.splice(index);
        this.messages.splice(index);
    }

    delete() {
        this.lines.forEach((l, i) => {
            this.deleteLine(i);
        });
    }

    getline(index) {
        return lines[index];
    }
}
