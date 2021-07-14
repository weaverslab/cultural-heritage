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

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setCategory(data.code);
      setImg(data.img);
    }
  }, [data]);

  return (
    <HeritageThumbnailPresenter title={title} category={category} img={img} />
  );
};

export default HeritageThumbnailContainer;
