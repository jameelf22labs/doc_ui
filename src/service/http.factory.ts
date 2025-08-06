import HttpNotes from "./notes.http";

export default class HttpFactory {
    static notes () {
        return new HttpNotes();
    }
}