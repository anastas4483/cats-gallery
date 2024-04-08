import React, { FC, memo } from 'react';
import './gallery.scss';

interface GalleryProps {
  data: string[];
  getNextData: () => void;
}

export const Gallery: FC<GalleryProps> = memo(({ data, getNextData }) => {
  const imageSize = 200;

  return (
    <div className="gallery">
      <div className="gallery-action-button back">❮</div>
      <div className="gallery-images-container">
        {data.map(item =>
          <img
            src={item}
            width={imageSize}
            height={imageSize}
          />
        )}
      </div>
      <div className="gallery-action-button next">❯</div>
    </div>
  );
});
