import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Knowledge on demand",
    pic: "home_01.png",
    description: (
      <>Pretrain helps you prepare your AI of choice for correct answers.</>
    ),
  },
  {
    title: "Train the AI with any content",
    pic: "home_02.png",
    description: (
      <>
        Use non-technical or code documentation - preferably a mix of both - for
        best results.
      </>
    ),
  },
  {
    title: "Your AI employee",
    pic: "home_03.png",
    description: (
      <>
        After pre-training for a context, the result is a highly competent AI
        employee who can help you polish your docs, answer customer support
        questions, and write tutorials for you.
      </>
    ),
  },
];

function Feature({ Svg, pic, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <img src={`img/${pic}`} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
