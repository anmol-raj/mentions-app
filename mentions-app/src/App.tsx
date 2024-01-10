import React from "react";
import MentionsComponent from "./components/MentionsComponent";

const App: React.FC = () => {
  const handleMentionChange = (text: string, selectedMention: any) => {
    console.log("Text:", text);
    console.log("Selected Mention:", selectedMention);
  };

  return (
    <div>
      <MentionsComponent onChange={handleMentionChange} />
    </div>
  );
};

export default App;
