import axios from "axios";
import handleApi from "./handle.api";
import type { Collabrator } from "./types";

export default class HttpCollab {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:9090/api/v1/collab";
  }

  httpGetAllCollaberators = (noteId: string) => {
    return handleApi<{ collabrator: Collabrator[] }>(
      axios.get(`${this.baseUrl}/${noteId}`)
    );
  };
}
