import { getCatImagesRequest } from '@/api/requests';
import { Gallery } from '@/components/gallery/Gallery';
import { Header } from '@/components/header/Header';
import { usePageableData } from '@/hooks/use-pageable-data';
import { CatImage } from '@/models/cat-image';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './gallery-page.scss';

export const GalleryPage = () => {

  const {
    data: images,
    loadFirstPage,
    loadNextPage,
    resetPagination
  } = usePageableData({ request: getCatImagesRequest });

  const getCatImagesUrls = (images: CatImage[]) =>
    images.map((image) => image.url);

  const imagesSrc = useMemo(() => getCatImagesUrls(images), [images.length]);

  const getNewPageImages = useCallback(() => {
    if (!imagesSrc.length) {
      loadFirstPage();
      return;
    }

    loadNextPage();
  }, [imagesSrc.length]);

  useEffect(() => {
    getNewPageImages();

    return resetPagination;
  }, []);

  return (
    <>
      <Header />
      <div className="gallery-page-content">
        <Gallery
          data={imagesSrc}
          getNextData={getNewPageImages}
        />
      </div>
    </>
  );
};
