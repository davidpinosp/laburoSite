import React from "react";
// Importing helper modules
import { useState } from "react";

// Importing core components
import QuillEditor from "react-quill";

// Importing styles
import "../assets/styles/richtext.css";
import "react-quill/dist/quill.snow.css";
interface RichTextProps {
  editorName: string;
  setHTMLValue: React.Dispatch<React.SetStateAction<string>>;
}
function RichTextEditor(props: RichTextProps) {
  // do this for an upper level comp
  const [value, setValue] = useState("");
  return (
    <div className="wrapper">
      <label className="label">{props.editorName}</label>
      <QuillEditor
        className="editor"
        theme="snow"
        value={value}
        onChange={(value) => {
          setValue(value);
          props.setHTMLValue(value);
          console.log(value);
        }}
        modules={{
          toolbar: [
            [{ size: ["small", false, "large"] }],
            ["bold", "italic", "underline"],
          ],
        }}
        style={{ fontSize: "20px" }}
      />
    </div>
  );
}

export default RichTextEditor;
