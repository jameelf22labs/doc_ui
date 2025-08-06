import type { JSX } from "react";
import React from "react";
import type { Notes } from "../../service/types";
import HttpFactory from "../../service/http.factory";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { format } from "date-fns";

const Dashboard = (): JSX.Element => {
  const [notes, setNotes] = React.useState<Notes[]>([]);

  const fetchNotes = async () => {
    try {
      const httpNotes = HttpFactory.notes();
      const res = await httpNotes.httpGetAllNote();
      setNotes(res);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };

  React.useEffect(() => {
    fetchNotes();
  }, []);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "PPpp");
  };

  return (
    <div className="flex flex-col items-center px-4 py-10 pt-20 min-h-screen h-full bg-[#0d1117] text-white">
      <div className="w-full max-w-7xl flex flex-col gap-6">
        <div className="flex justify-between items-center border-b border-gray-700 pb-4">
          <h1 className="font-bold text-3xl">All Notes</h1>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition">
            + New Note
          </button>
        </div>

        <div className="w-full bg-[#161b22]  rounded-lg shadow-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <span className="text-white text-center capitalize text-[18px]"> Name </span>
                </TableHead>
                <TableHead>
                  <span className="text-white text-center capitalize text-[18px]"> Created At </span>
                </TableHead>
                <TableHead>
                  <span className="text-white text-center capitalize text-[18px]"> Updated At </span>
                </TableHead>
                <TableHead className="text-center">
                  <span className="text-white text-center capitalize text-[18px]"> Action </span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6">
                    No notes found.
                  </TableCell>
                </TableRow>
              ) : (
                notes.map((note) => (
                  <TableRow key={note.id} className="hover:bg-[#21262d]">
                    <TableCell>{note.name}</TableCell>
                    <TableCell>{formatDate(note.createdAt)}</TableCell>
                    <TableCell>{formatDate(note.updatedAt)}</TableCell>
                    <TableCell className="text-center">
                      <a
                        href={`/note/${note.id}`}
                        className="inline-block px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded transition"
                      >
                        Edit
                      </a>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
