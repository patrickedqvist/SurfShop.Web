import React, { useEffect, useRef } from 'react';
import Swiper, { SwiperOptions } from 'swiper';
import classNames from 'classnames';
import { map, merge, has } from 'lodash/fp';

// Styling
import './swiper.scss'
import './image-gallery.scss';

// Types
import { Media } from '../../typeDefs/media';

interface IProps {
    images: Media[],
    mainSettings?: SwiperOptions,
    useThumbnails?: boolean
}

const defaultSettings: SwiperOptions = {}

const createSlides = ( images: Media[], asBackground: boolean = false ) => {
    if ( asBackground ) {
        return map((image: Media) => (
            <div key={image.src} className="swiper-slide" style={{ backgroundImage: `url(${image.src})` }} />
        ), images)
    }

    return map((image: Media) => (
        <div key={image.src} className="swiper-slide">
            <img src={image.src} alt={image.alt} />
        </div>
    ), images)
    
}

export const ImageGallery = ({ images, mainSettings, useThumbnails }: IProps) => {

    const galleryThumbs = useRef(null);
    const galleryMain = useRef(null);

    useEffect(() => {

        const initSwiper = async () => {

            galleryThumbs.current = new Swiper('.gallery-thumbs', {
                spaceBetween: 10,
                slidesPerView: 4,
                freeMode: true,
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
                direction: 'vertical'
            });

            const thumbnailSettings = {
                thumbs: {
                    swiper: galleryThumbs.current
                }
            }

            const settings = useThumbnails ? merge(thumbnailSettings, mainSettings) : mainSettings;

            galleryMain.current = new Swiper('.gallery-main', settings);
        }

        initSwiper();
    }, [images])

    const classes = classNames('imageGallery', {
        'imageGallery--thumbnails': useThumbnails
    });

    const mainSlides = createSlides(images);
    const thumbs = useThumbnails ? createSlides(images, true) : null;

    return (
        <div className={classes}>

            {useThumbnails && (
                <div className="swiper-container gallery-thumbs">
                    <div className="swiper-wrapper">
                        {thumbs}
                    </div>
                </div>
            )}

            <div className="swiper-container gallery-main">                                
                <div className="swiper-wrapper">                
                    {mainSlides}
                </div>                                                
            </div>

        </div>        
    )
}

ImageGallery.defaultProps = {
    swiperSettings: defaultSettings,
    useThumbnails: false
}