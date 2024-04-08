import { getCatImagesRequest } from '@/api/requests';
import { Gallery } from '@/components/gallery/Gallery';
import { Header } from '@/components/header/Header';
import { usePageableData } from '@/hooks/use-pageable-data';
import { CatImage } from '@/models/cat-image';
import React, { useCallback, useEffect, useState } from 'react';
import './gallery-page.scss';

export const GalleryPage = () => {

  const [catImages, setCatImages] = useState<string[]>([]);

  const { loadFirstPage, loadNextPage } = usePageableData({ request: getCatImagesRequest });

  const getCatImagesUrls = (images: CatImage[]) =>
    images.map((image) => image.url);

  const getNewPageImages = useCallback(() => {
    if (!catImages.length) {
      loadFirstPage()
        .then((res) => setCatImages(getCatImagesUrls(res)));
      return;
    }

    loadNextPage()
      .then((res) => setCatImages(getCatImagesUrls(res)));
  }, [catImages]);

  const resetCatImages = () => setCatImages([]);

  useEffect(() => {
    getNewPageImages();

    return resetCatImages;
  }, []);

  return (
    <div>
      <Header />
      <Gallery
        data={catImages}
        getNextData={getNewPageImages}
      />
    </div>
  );
};
