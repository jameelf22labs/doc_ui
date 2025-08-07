import type { JSX } from "react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { Collabrator, Notes } from "../../service/types";
import HttpFactory from "../../service/http.factory";
import { socket } from "../../service/socket";
import { AvatarGroup } from "../../components/ui/AvatarGroup";
import { getUser } from "../../common/utils";
import { toast } from "sonner";

const CollaborativeNote = (): JSX.Element => {
  const { noteId } = useParams();
  const [note, setNote] = useState<Notes | null>(null);
  const [collaborators, setCollaborators] = useState<Collabrator[]>([]);
  const [isUserAdded, setIsUserAdded] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      const httpNotes = HttpFactory.notes();
      const fetchedNote = await httpNotes.httpGetNote(noteId as string);
      setNote(fetchedNote);
    };

    fetchNote();
  }, []);

  useEffect(() => {
    const user = getUser();

    socket.emit("note-join", noteId, user);

    socket.on("note-changed-content", (content) => {
      setNote((prev) => (prev ? { ...prev, content: content } : prev));
    });

    socket.on("note-new-user-joined", () => {
      setIsUserAdded(!isUserAdded);
      toast(<span className="text-xl"> New user joined </span>);
    });

    socket.on("note-user-leaved", () => {
      setIsUserAdded(!isUserAdded);
      toast(<span className="text-xl"> User leave </span>);
    });
  }, []);

  useEffect(() => {
    const fetchCollaborators = async () => {
      const httpCollabs = HttpFactory.collab();
      const res = await httpCollabs.httpGetAllCollaberators(noteId as string);
      setCollaborators(res.collabrator);
    };

    fetchCollaborators();
  }, [isUserAdded]);

  const handleUserLeave = () => {
    try {
      socket.emit("note-user-leave", noteId, getUser());
      const httpCollabs = HttpFactory.collab();
      httpCollabs.httpLeaveRoom(noteId as string, getUser().userName);
    } catch (error) {}
  };

  React.useEffect(() => {
    window.addEventListener("beforeunload", handleUserLeave);
    return () => {
      window.removeEventListener("beforeunload", handleUserLeave);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setNote((prev) => (prev ? { ...prev, content: newContent } : prev));
    socket.emit("note-change-content", noteId, newContent);
  };

  const handleLeaveRoom = () => {
    handleUserLeave();
    navigate("/");
  };

  if (!note) return <div className="text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-26">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{note.name}</h1>
          <AvatarGroup collaborators={collaborators} />
        </div>

        <textarea
          className="w-full h-[70vh] bg-gray-800 text-white border border-gray-700 rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={note.content}
          onChange={handleChange}
        />

        <div className="flex justify-end p-3 w-full">
          <button
            onClick={handleLeaveRoom}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-all"
          >
            Leave Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollaborativeNote;
