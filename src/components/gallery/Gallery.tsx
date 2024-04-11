import React, { FC, memo, useEffect, useMemo, useState } from 'react';
import './gallery.scss';

interface GalleryProps {
  data: string[];
  getNextData: () => void;
}

export const Gallery: FC<GalleryProps> = memo(({ data, getNextData }) => {

  const imageSize = 200;
  // Must be equal with .gallery-images-container gap property
  const galleryGap = 50;

  const [galleryImageContainerLeftStyle, setGalleryImageContainerLeftStyle] = useState(0);
  const moveGalleryNext = () => {
    if (imagesAmountBeforeEnd > 3) {
      setGalleryImageContainerLeftStyle(prev => prev - imageSize - galleryGap);
    }
  };

  const moveGalleryBack = () => {
    if (galleryImageContainerLeftStyle < 0) {
      setGalleryImageContainerLeftStyle(prev => prev + imageSize + galleryGap);
    }
  };

  const imagesAmountBeforeEnd = useMemo(() =>
    data.length - Math.abs(galleryImageContainerLeftStyle / (imageSize + galleryGap)),
    [data.length, galleryImageContainerLeftStyle]);

  useEffect(() => {
    if (data.length && imagesAmountBeforeEnd < 6) {
      getNextData();
    }
  }, [imagesAmountBeforeEnd, data.length]);

  return (
    <div className="gallery">
      <div
        className="gallery-action-button back"
        onClick={moveGalleryBack}
      >
        ❮
      </div>
      <div
        className="gallery-images-container"
        style={{
          left: galleryImageContainerLeftStyle,
          gap: galleryGap
        }}
      >
        {data.map(item =>
          <img
            key={item}
            src={item}
            width={imageSize}
            className="gallery-image"
          />
        )}
      </div>
      <div
        className="gallery-action-button next"
        onClick={moveGalleryNext}
      >
        ❯
      </div>
    </div>
  );
});
