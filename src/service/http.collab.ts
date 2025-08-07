import axios from "axios";
import handleApi from "./handle.api";
import type { Collabrator } from "./types";

export default class HttpCollab {
  private readonly baseUrl: string;

  constructor() {
    const host = import.meta.env.VITE_API_URL || "https://sde-intern-resources-node-io-api.vaacdq.easypanel.host";
    this.baseUrl = `${host}/api/v1/collab`;
  }

  httpGetAllCollaberators = (noteId: string) => {
    return handleApi<{ collabrator: Collabrator[] }>(
      axios.get(`${this.baseUrl}/${noteId}`)
    );
  };

  httpLeaveRoom = (noteId: string, userName: string) => {
    return handleApi(
      axios.post(this.baseUrl + "/leaveRoom", { noteId, userName })
    );
  };
}
