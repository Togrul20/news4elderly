import React, { useState, useRef } from "react";
import Link from "next/link";
import { Image } from "cloudinary-react";
import "rsuite/dist/rsuite.min.css";
import styles from "@/styles/Home.module.css";
import Footer from "../../partials/Footer";
import Navbar from "../../partials/Navbar";
import TopPage from "@/partials/TopPage";
import { convertToSlug } from "@/utils/convertToSlug";
import TextToSpeechTitle from "../../partials/TextToSpeechTitle"

// API
export const getStaticProps = async () => {
  const result = await fetch(
    `https://newsdata.io/api/1/news?apikey=${process.env.NEWSDATA_KEY}&country=az,us,tr,ru,in&category=technology`
  );
  const options = await result.json();

  return {
    props: { technology: options },
  };
};

const cloudinaryName = process.env.CLOUDINARY_CLOUD_NAME;

const Technology = ({ technology }) => {
  ///// Zoom in and out
  var [fontSize, setFontSize] = useState(30);
  const zoomIn = (e) => {
    e.preventDefault();
    setFontSize(fontSize + 2);
  };
  const zoomOut = (e) => {
    e.preventDefault();
    setFontSize(fontSize - 2);
  };

  const title = technology.results.map((el) => {
    return el.title;
  });

  const refEl = useRef(null);


  return (
    <div className={styles.sciencestyle}>
      <div>
        <Navbar />
      </div>
      <h1 className={styles.pageHeader}>Technology News</h1>

      <TextToSpeechTitle refEl={refEl} />
      <TopPage />

      <div ref={refEl}>
        {technology.results.map((el) => (
          <div key={el.id} className={styles.generalContainer}>
            <div className={styles.imageContainer}>
              <Image
                className={styles.imageitslef}
                src={el.image_url}
                cloudName={cloudinaryName}
                width={150}
                height={150}
                alt="Image of the news"
                object-fit="fit"
              />
            </div>
            <div className={styles.dateTimeContainer}>
              <span>Published:</span>
              <span>{el.pubDate}</span>
            </div>
            <Link
              href={"/technology/" + convertToSlug(el?.title)}
              key={el.id}
              legacyBehavior
            >
              <p
                className={styles.newscontentssingle}
                style={{ fontSize: fontSize }}
              >
                {el.title}

                <span className={styles.contentTooltip}>
                  Click to see the news
                </span>
              </p>
            </Link>
          </div>
        ))}
      </div>
      <Footer zoomIn={zoomIn} zoomOut={zoomOut} />
    </div>
  );
};

export default Technology;
