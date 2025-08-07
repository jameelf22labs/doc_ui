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
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const Dashboard = (): JSX.Element => {
  const [notes, setNotes] = React.useState<Notes[]>([]);
  const [noteName, setNoteName] = React.useState("");
  const [isCreating, setIsCreating] = React.useState(false);

  const fetchNotes = async () => {
    try {
      const httpNotes = HttpFactory.notes();
      const res = await httpNotes.httpGetAllNote();
      setNotes(res);
    } catch (error) {
      console.error("Error to fetch notes:", error);
    }
  };

  React.useEffect(() => {
    fetchNotes();
  }, []);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "PPpp");
  };

  const handleCreateNote = async () => {
    if (!noteName.trim()) return;
    try {
      setIsCreating(true);
      const httpNotes = HttpFactory.notes();
      await httpNotes.httpCreateNote({ name: noteName });
      await fetchNotes(); 
      setNoteName(""); 
    } catch (error) {
      console.error("Error from create note:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="flex flex-col items-center px-4 py-10 pt-20 min-h-screen h-full bg-[#0d1117] text-white">
      <div className="w-full max-w-7xl flex flex-col gap-6">
        <div className="flex justify-between items-center border-b border-gray-700 pb-4">
          <h1 className="font-bold text-3xl">All Notes</h1>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
                + New Note
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#161b22] text-white border border-gray-700">
              <DialogHeader>
                <DialogTitle>Create New Note</DialogTitle>
              </DialogHeader>
              <Input
                placeholder="Enter note name"
                value={noteName}
                onChange={(e) => setNoteName(e.target.value)}
                className="mt-4 bg-[#0d1117] border border-gray-700 text-white"
              />
              <DialogFooter className="mt-4">
                <Button
                  onClick={handleCreateNote}
                  disabled={isCreating}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isCreating ? "Creating..." : "Create"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="w-full bg-[#161b22] rounded-lg shadow-md overflow-hidden">
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
