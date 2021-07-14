import React, { useEffect, useState } from "react";
import HeritageThumbnailPresenter from "./HeritageThumbnailPresenter";

interface Props {
  data: Heritage | undefined;
}

const HeritageThumbnailContainer: React.FunctionComponent<Props> = ({
  data,
}: Props) => {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [id, setId] = useState<string>("");

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setCategory(data.code);
      setImg(data.img);
      setId(data.id);
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
