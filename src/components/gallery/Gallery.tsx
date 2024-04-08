import React, { FC, memo } from 'react';

interface GalleryProps {
  data: string[];
  getNextData: () => void;
}

export const Gallery: FC<GalleryProps> = memo(({ data, getNextData }) => {
  return (
    <div>
      {data.map(item => item)}
    </div>
  );
});
