import { EditorProvider, PortableTextEditable } from "@portabletext/editor";
import { EventListenerPlugin } from "@portabletext/editor/plugins";
import { useEffect, useState } from "react";
import { schemaDefinition } from "./schema";
import { Toolbar } from "@/components/text-editor/Toolbar";
import { renderDecorator, renderStyle } from "./editor.render";

const PortableText = ({
  onChange,
  value,
}: {
  value: any[] | undefined;
  onChange: (value: any[] | undefined) => void;
}) => {
  const [editorKey, setEditorKey] = useState("empty-editor");

  useEffect(() => {
    if (
      editorKey === "empty-editor" &&
      Array.isArray(value) &&
      value.length > 0
    ) {
      setEditorKey("loaded-editor");
    }
  }, [value, editorKey]);
  return (
    <div
      key={editorKey}
      className="flex flex-col border border-input rounded-md overflow-hidden bg-background focus-within:ring-1 focus-within:ring-ring focus-within:border-primary transition-all shadow-sm"
    >
      <EditorProvider
        initialConfig={{ schemaDefinition, initialValue: value || undefined }}
      >
        <EventListenerPlugin
          on={(event) => {
            if (event.type === "mutation") {
              // Ensure we pass back valid data or undefined
              const snapshot = event.value;
              if (!snapshot || snapshot.length === 0) {
                onChange(undefined);
              } else {
                onChange(snapshot);
              }
            }
          }}
        />

        <Toolbar />
        <div className="p-4 min-h-62.5 cursor-text">
          <PortableTextEditable
            className="outline-none max-w-none text-foreground"
            renderStyle={renderStyle}
            renderDecorator={renderDecorator}
            renderBlock={(props) => (
              <div className="mb-2">{props.children}</div>
            )}
            renderListItem={(props) => (
              <li className="ml-6 list-disc mt-2">{props.children}</li>
            )}
          />
        </div>
      </EditorProvider>
    </div>
  );
};

export default PortableText;
