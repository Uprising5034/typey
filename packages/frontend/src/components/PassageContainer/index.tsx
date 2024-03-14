import { useState } from "react";
import PassageInput from "../PassageInput";
import PassageStatDisplay from "../PassageStatDisplay";
import PassageControls from "../PassageControls";

const shortText = "oeu nth oeu nth";

export default function PassageContainer() {
  const [passage, setPassage] = useState<Passage.Word[]>(
    setupPassage(shortText),
  );
  const [passageStats, setPassageStats] =
    useState<Passage.Stats>(setupPassageStats());
  const [wordIndex, setWordIndex] = useState(0);

  const passageComplete = passage.every((word) => word.match);

  return (
    <div className="flex grow flex-col justify-center gap-8">
      {!passageComplete && (
        <PassageInput
          passage={passage}
          passageComplete={passageComplete}
          passageStats={passageStats}
          setPassage={setPassage}
          setPassageStats={setPassageStats}
          wordIndex={wordIndex}
          setWordIndex={setWordIndex}
        />
      )}
      {passageComplete && <PassageStatDisplay passageStats={passageStats} />}
      <PassageControls />
    </div>
  );
}

function setupPassage(inputText: string): Passage.Word[] {
  function mapLetters(word: string) {
    return word
      .split("")
      .map((letter, index) => ({ char: letter, index, perfect: true }));
  }
  return inputText.split(" ").map((word, index) => ({
    expect: {
      word,
      letters: mapLetters(word),
    },
    userInput: "",
    index,
    match: false,
    extraCount: 0,
  }));
}

function setupPassageStats() {
  return { startTime: 0, endTime: 0, accuracy: { hit: 0, miss: 0, extras: 0 } };
}
