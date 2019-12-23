import React, { useEffect, useRef } from 'react'
import Swiper, { SwiperOptions } from 'swiper'
import classNames from 'classnames'
import { map, merge } from 'lodash/fp'

// Styling
import './swiper.scss'
import './image-gallery.scss'

// Types
import { Media } from '../../typeDefs/media'

interface Props {
  images: Media[];
  settings?: SwiperOptions;
  useThumbnails?: boolean;
}

const DEFAULT_SETTINGS: SwiperOptions = {
  direction: 'vertical',
  effect: 'fade',
  passiveListeners: true,
  preloadImages: true,
}

interface SlideProps {
  images: Media[];
  asBackground: boolean;
}

interface SingleSliderProps {
  image: Media;
  asBackground: boolean;
}

const Slide: React.FC<SingleSliderProps> = ({ image, asBackground }) => {
  if (asBackground) {
    return <div className='swiper-slide' style={{ backgroundImage: `url(${image.src})` }} />
  }

  return (
    <div className='swiper-slide'>
      <img
        src={image.src}
        width={image.width || undefined}
        height={image.height || undefined}
        alt={image.alt ? image.alt : 'slide image'}
      />
    </div>
  )
}

const Slides: React.FC<SlideProps> = ({ images, asBackground }) => (
  <div className='swiper-wrapper'>
    {map(
      (image: Media) => (
        <Slide key={image.src} image={image} asBackground={asBackground} />
      ),
      images
    )}
  </div>
)

export const ImageGallery: React.FC<Props> = ({ images, settings, useThumbnails }) => {
  const galleryThumbsElement = useRef<HTMLDivElement>(null)
  const galleryMainElement = useRef<HTMLDivElement>(null)
  const galleryThumbsInstance = useRef(null)
  const galleryMainInstance = useRef(null)

  // Build Swiper
  const buildSwiper = () => {
    // Build gallery thumbs
    if (useThumbnails && galleryThumbsElement.current) {
      galleryThumbsInstance.current = new Swiper(galleryThumbsElement.current, {
        spaceBetween: 8,
        slidesPerView: 'auto',
        freeMode: true,
        freeModeSticky: true,
        threshold: 5,
        preventClicks: false,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        direction: 'vertical',
        mousewheel: true,
      })
    }

    if (galleryMainElement.current) {
      const thumbnailSettings = {
        thumbs: {
          swiper: galleryThumbsInstance.current,
        },
      }

      const configuration = useThumbnails ? merge(thumbnailSettings, settings) : settings

      galleryMainInstance.current = new Swiper(galleryMainElement.current, configuration)
    }
  }

  // Destroy Swiper
  const destroySwiper = () => {
    if (useThumbnails && galleryThumbsInstance.current !== null) {
      galleryThumbsInstance.current.destroy(true, true)
      galleryThumbsInstance.current = null
    }

    if (galleryMainInstance.current !== null) {
      galleryMainInstance.current.destroy(true, true)
      galleryMainInstance.current = null
    }
  }

  useEffect(() => {
    buildSwiper()

    return () => destroySwiper()
  }, [])

  const classes = classNames('imageGallery', {
    'imageGallery--thumbnails': useThumbnails,
  })

  return (
    <div className={classes}>
      {useThumbnails && (
        <div className='swiper-container gallery-thumbs' ref={galleryThumbsElement}>
          <Slides images={images} asBackground />
        </div>
      )}

      <div className='swiper-container gallery-main' ref={galleryMainElement}>
        <Slides images={images} asBackground={false} />
      </div>
    </div>
  )
}

ImageGallery.defaultProps = {
  settings: DEFAULT_SETTINGS,
  useThumbnails: false,
}
