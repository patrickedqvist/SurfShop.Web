import React, { useEffect } from 'react';
import Swiper, { SwiperOptions } from 'swiper';
import classNames from 'classnames';
import { map, merge } from 'lodash/fp';

// Styling
import './swiper.scss'
import './image-gallery.scss';

// Types
import { Media } from '../../typeDefs/media';

interface IProps {
    images: Media[],
    swiperSettings?: SwiperOptions
}

const defaultSettings: SwiperOptions = {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
}

export const ImageGallery = ({ images, swiperSettings }: IProps) => {

    useEffect(() => {
        const initSwiper = async () => {
            new Swiper('.swiper-container', swiperSettings);
        }

        initSwiper();
    })

    const classes = classNames('imageGallery');

    const slides = map((image: Media) => (
        <div className="swiper-slide" key={image.url}>
            <img src={image.url} alt={image.alt} />
        </div>
    ), images)

    return (
        <div className={classes}>
            <div className="swiper-container">                
                
                <div className="swiper-wrapper">                
                    {slides}
                </div>
                

                {swiperSettings.pagination && <div className="swiper-pagination"></div>}
                
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
                
                {swiperSettings.scrollbar &&<div className="swiper-scrollbar"></div>}

            </div>
        </div>
        
    )
}

ImageGallery.defaultProps = {
    swiperSettings: defaultSettings
}