import React, { useEffect, useState } from "react";
import HeritageThumbnailPresenter from "./HeritageThumbnailPresenter";

interface Props {
  data: Heritage;
}

const HeritageThumbnailContainer: React.FunctionComponent<Props> = ({
  data,
}: Props) => {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [id, setId] = useState<string>("");

  useEffect(() => {
    // async function checkGuide() {
    //   const db = firebase.firestore();
    //   const guideCollection = await db
    //     .collection("heritage")
    //     .doc(data.id)
    //     .collection("guide")
    //     .get();
    // }
    if (data) {
      setTitle(data.title);
      setCategory(data.code);
      setImg(data.img);
      setId(data.id);
      // checkGuide();
    }
  }, [data]);

  return (
    <HeritageThumbnailPresenter
      title={title}
      category={category}
      img={img}
      id={id}
    />
  );
};

export default HeritageThumbnailContainer;
