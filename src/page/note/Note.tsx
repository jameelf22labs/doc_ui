import type { JSX } from "react";
import React from "react";
import { useParams } from "react-router";
import type { Notes } from "../../service/types";
import HttpFactory from "../../service/http.factory";

const Note = (): JSX.Element => {
  const { nodeId } = useParams();
  const [note, setNote] = React.useState<Notes>();

  React.useEffect(() => {
    (async () => {
        const httpNotes = HttpFactory.notes();
        const note = await httpNotes.httpGetNote(nodeId as string);
        setNote(note);
    })()
  } , [])

  return <div> Heelo </div>;
};

export default Note;
