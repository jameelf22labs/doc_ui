import type { JSX } from "react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import type { Collabrator, Notes } from "../../service/types";
import HttpFactory from "../../service/http.factory";
import { socket } from "../../service/socket";
import { AvatarGroup } from "../../components/ui/AvatarGroup";
import { getUser } from "../../common/utils";
import { toast } from "sonner";

const CollaborativeNote = (): JSX.Element => {
  const { noteId } = useParams<{ noteId: string }>(); 
  const [note, setNote] = useState<Notes | null>(null);
  const [collaborators, setCollaborators] = useState<Collabrator[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!noteId) {
      navigate("/");
      return;
    }

    const user = getUser();

    const fetchNote = async () => {
      try {
        const httpNotes = HttpFactory.notes();
        const fetchedNote = await httpNotes.httpGetNote(noteId);
        setNote(fetchedNote);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCollaborators = async () => {
      try {
        const httpCollabs = HttpFactory.collab();
        const res = await httpCollabs.httpGetAllCollaberators(noteId);
        setCollaborators(res.collabrator); 
      } catch (error) {
        console.error(error);
      }
    };

    socket.emit("note-join", noteId, user);

    socket.on("note-changed-content", (content: string) => {
      setNote((prev) => (prev ? { ...prev, content } : prev));
    });

    socket.on("note-new-user-joined", () => {
      fetchCollaborators(); 
      toast(<span className="text-xl">New user joined</span>);
    });

    socket.on("note-user-leaved", () => {
      fetchCollaborators(); 
      toast(<span className="text-xl">User left</span>); 
    });

    fetchNote();
    fetchCollaborators();

    return () => {
      socket.off("note-changed-content");
      socket.off("note-new-user-joined");
      socket.off("note-user-leaved");
      handleUserLeave();
    };
  }, [noteId]); 

  const handleUserLeave = async () => {
    try {
      const user = getUser();
      socket.emit("note-user-leave", noteId, user);
      const httpCollabs = HttpFactory.collab();
      await httpCollabs.httpLeaveRoom(noteId as string, user.userName);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setNote((prev) => (prev ? { ...prev, content: newContent } : prev));
    socket.emit("note-change-content", noteId, newContent);
  };

  const handleLeaveRoom = async () => {
    await handleUserLeave();
    navigate("/");
  };

  if (!noteId) {
    return <div className="text-white">Invalid note ID</div>;
  }

  if (!note) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-20">
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
