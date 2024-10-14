'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import classes from './image-slideshow.module.css';

const images = [
  { image: '/images/hello1.png', alt: 'A delicious, juicy burger' },
  { image: '/images/hello2.png', alt: 'A delicious, spicy curry' },
  { image: '/images/hello3.png', alt: 'Steamed dumplings' },
  { image: '/images/hello4.png', alt: 'Mac and cheese' },
];

export default function ImageSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000); // 5초마다 다음 인덱스 이미지

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 메모리 누수 방지
  }, []);

  return (
    <div className={classes.slideshow}>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.image}
          className={index === currentImageIndex ? classes.active : ''}
          alt={image.alt}
          width = {500}
          height = {300}
        />
      ))}
    </div>
  );
}