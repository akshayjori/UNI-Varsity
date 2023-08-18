import React from "react";
import { useParams } from "react-router-dom";
import cc from "../css/coursepage.module.css";
import { SlBookOpen } from "react-icons/sl";
import { LoremIpsum } from "lorem-ipsum";
import BackArrow from "./BackArrow";

const CoursePage = () => {
  const param = useParams();
  const lorem = new LoremIpsum({
    count: 2, // Number of "words", "sentences", or "paragraphs"
    format: "plain", // "plain" or "html"
    paragraphLowerBound: 2, // Min. number of sentences per paragraph.
    paragraphUpperBound: 2, // Max. number of sentences per paragarph.
    sentenceLowerBound: 5, // Min. number of words per sentence.
    sentenceUpperBound: 15, // Max. number of words per sentence.
    prefix: "HIIII",
    suffix: "\n\t\t\t\tXXXXXXXXXXXXXXXXXX", // Line ending, defaults to "\n" or "\r\n" (win32)
    units: "sentences",
  });

  return (
    <div className={cc.course_box}>
      <BackArrow className="pt-3" />
      <h1>
        <SlBookOpen /> {param.courseName} <SlBookOpen />
      </h1>
      <p>{lorem.generateParagraphs(20)}</p>
      <p>
        *******************************************************************End
        of the course
        *******************************************************************
      </p>
    </div>
  );
};

export default CoursePage;
