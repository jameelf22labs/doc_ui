import axios from "axios";
import handleApi from "./handle.api";
import type { Note, Notes } from "./types";

export default class HttpNotes {
  private readonly baseUrl: string;

  constructor() {
    const host = import.meta.env.VITE_API_URL || "http://localhost:9090";
    this.baseUrl = `${host}/api/v1/notes`;
  }

  async httpCreateNote(note: Note) {
    return handleApi(axios.post(this.baseUrl + "/newNote", { ...note }));
  }

  async httpGetNote(noteId: string) {
    return handleApi<Notes>(axios.get(this.baseUrl + `/${noteId}`));
  }

  async httpGetAllNote() {
    return handleApi<Notes[]>(axios.get(this.baseUrl + "/all"));
  }

  async httpDeleteNote(noteId: string) {
    return handleApi(axios.delete(this.baseUrl + `/${noteId}`));
  }
}
