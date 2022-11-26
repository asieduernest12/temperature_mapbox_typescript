import React, { FC, ReactElement, useRef, useEffect, useState } from "react";
import { ImFolderUpload } from "react-icons/im";
import { FaTemperatureHigh } from "react-icons/fa";
import logo from "../images/weather_logo.svg";

export const Sidebar: FC = (): ReactElement => {
  const inputEl = useRef<HTMLInputElement>(null);
  const [_file, set_file] = useState("");

  useEffect(() => {
    console.log({ inputEl });
  }, [inputEl]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    // handle the input...
    console.log("file", e.target.files);
    console.log("file", e.target.files[0]);
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      console.log("e.target.result", e.target);
      const target = e.target;
      const result = target?.result;
      console.log(typeof result);
      localStorage.setItem("data", JSON.stringify(result));
      // console.log(e.target.result);
      // set_file(e.target?.result);
    };

    // const formData = new FormData();
    // formData.append("file", e.target.files[0]);
    // console.log("formData", formData);
    // const res = await fetch("http://localhost:8000/upload-file", {
    //   method: "POST",
    //   body: formData,
    // }).then((res) => res.json());
    // alert(JSON.stringify(`${res.message}, status: ${res.status}`));
  };
  const handleSendUpload = async () => {
    console.log("click");

    if (inputEl && inputEl.current) {
      console.log(inputEl);
      console.log(inputEl.current);
      inputEl.current.focus();
      console.log(inputEl.current.focus());
    }

    //send upload

    var data = new FormData();
    // data.append("file", input.files[0]);
    data.append("file", _file);

    // fetch("/upload-file", {
    //   method: "POST",
    //   body: data,
    // });
  };
  return (
    <div className="meau">
      <div className="logo">
        <img src={logo} alt="Logo Images" />
        <h1>Tem Map</h1>
      </div>
      <input
        ref={inputEl}
        type="file"
        onChange={handleChange}
        // style={{ display: "none" }}
      />
      <input
        type="file"
        onChange={handleChange}
        // style={{ display: "none" }}
      />
      <button className="list" onClick={handleSendUpload}>
        <ImFolderUpload />
        <h1>Upload File</h1>
      </button>

      <button className="list">
        <FaTemperatureHigh />
        <h1>Change C/F</h1>
      </button>
    </div>
  );
};
