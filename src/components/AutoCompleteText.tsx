import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import "./AutoCompleteText.css";

type Course = {
  courseid: number;
  code: string;
  title: string;
  crhr: number;
  semester: number;
};

type Props = {
  items: Course[];
  SelectedItem: (value: Course) => void;
};

type State = {
  suggesions: Course[];
  text: string;
  SelectedIndex: number;
};

export default function AutoCompleteText(props: Props) {
  const [state, setState] = useState<State>({
    suggesions: [],
    text: "",
    SelectedIndex: 0
  });
  //   const suggestionSelected = (value: Course) => {};

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key);
    if (
      e.key === "ArrowDown" &&
      state.SelectedIndex !== state.suggesions.length - 1
    ) {
      // down key
      setState({ ...state, SelectedIndex: state.SelectedIndex + 1 });
    } else if (e.key === "ArrowUp" && state.SelectedIndex !== 0) {
      // up key
      setState({ ...state, SelectedIndex: state.SelectedIndex - 1 });
    } else if (e.key === "Escape") {
      // escape key
      setState({ ...state, suggesions: [], text: "", SelectedIndex: 0 });
    } else if (e.key === "Enter") {
      // enter key
      if (e.currentTarget.value !== "") {
        suggestionSelected(state.suggesions[state.SelectedIndex]);
      }
    }
  };

  const onTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const { items } = props;
    const value = e.currentTarget.value;
    let suggesions: Course[] = [];
    if (value.length > 0) {
      const regex = new RegExp(`${value}`, "i");
      suggesions = items.sort().filter((c) => regex.test(c.title));
    }
    setState({ ...state, suggesions, text: value, SelectedIndex: 0 });
  };

  const suggestionSelected = (value: Course) => {
    props.SelectedItem(value);
    setState({ ...state, text: "", suggesions: [] });
  };

  const renderSuggestion = () => {
    if (state.suggesions.length === 0) {
      return null;
    }

    return (
      <ul>
        {state.suggesions.map((item, i) => (
          <li
            key={i}
            onClick={() => suggestionSelected(item)}
            className={i === state.SelectedIndex ? "selected" : ""}
          >
            {item.title}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="AutoCompleteText">
      <input
        value={state.text}
        onChange={onTextChanged}
        onKeyDown={handleKeyDown}
        type="text"
        style={{ width: "350px" }}
      />
      {renderSuggestion()}
    </div>
  );
}
