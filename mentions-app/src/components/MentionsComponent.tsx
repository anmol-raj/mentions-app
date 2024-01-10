import React, { useState } from "react";
import mentionsData from "../data.json";

interface Mention {
  id: string;
  name: string;
}

interface MentionsComponentProps {
  onChange: (text: string, selectedMention: Mention | null) => void;
}

const MentionsComponent: React.FC<MentionsComponentProps> = ({ onChange }) => {
  const [inputText, setInputText] = useState<string>("");
  const [selectedMention, setSelectedMention] = useState<Mention | null>(null);
  const [suggestions, setSuggestions] = useState<Mention[]>([]);
  const [isInputClicked, setIsInputClicked] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setInputText(text);

    // Check if @ symbol is present
    if (text.includes("@")) {
      // Extract the mention after @ symbol
      const mentionName = text.split("@")[1].split(" ")[0].toLowerCase();

      // Find the mention from data.json
      const mention = mentionsData.find((mention: Mention) =>
        mention.name.toLowerCase().includes(mentionName)
      );

      setSelectedMention(mention || null);

      // Filter suggestions based on input
      const filteredSuggestions = mentionsData.filter((mention: Mention) =>
        mention.name.toLowerCase().includes(mentionName)
      );

      setSuggestions(filteredSuggestions);
    } else {
      setSelectedMention(null);
      setSuggestions([]);
    }

    // Trigger the onChange handler
    onChange(text, selectedMention);
  };

  const handleInputClick = () => {
    setIsInputClicked(true);
  };

  const handleSuggestionClick = (mention: Mention) => {
    setInputText(`@${mention.name} `);
    setSuggestions([]);
    setIsInputClicked(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        onClick={handleInputClick}
        placeholder="Mention"
        style={{
          height: isInputClicked ? "82px" : "40px",
        }}
      />
      {selectedMention && (
        <div className="selected-mention">{selectedMention.name}</div>
      )}
      {suggestions.length > 0 && (
        <ul className="suggestion-box">
          {suggestions.map((mention: Mention) => (
            <li key={mention.id} onClick={() => handleSuggestionClick(mention)}>
              {mention.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MentionsComponent;
