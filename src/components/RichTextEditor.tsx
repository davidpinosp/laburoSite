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
  htmlValue: string;
  setHTMLValue: React.Dispatch<React.SetStateAction<string>>;
}
function RichTextEditor(props: RichTextProps) {
  // do this for an upper level comp
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue] = useState("");
  return (
    <div className="wrapper">
      <label className="label" style={{ fontSize: "18px" }}>
        {props.editorName}
      </label>
      <QuillEditor
        className="editor"
        theme="snow"
        value={props.htmlValue}
        onChange={(value) => {
          setValue(value);
          props.setHTMLValue(value);
        }}
        modules={{
          toolbar: [
            [{ size: ["small", false, "large"] }],
            ["bold", "italic", "underline"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
          ],
        }}
        style={{ fontSize: "30px" }}
      />
    </div>
  );
}

export default RichTextEditor;
