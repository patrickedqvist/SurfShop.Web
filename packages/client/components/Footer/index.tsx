import React, { memo } from 'react'

// Components
import { Widget } from '../Widget';
import { InternalLink } from '../InternalLink';

// Style
import './footer.scss'

const FooterComponent = () => {
    return ( 
        <footer className={'footer'}>
            <div className={'footer-container'}>
                <Widget type={'general'}>
                    <h1>SurfShop</h1>
                </Widget>
                <Widget type={'menu'} title={'Behöver du hjälp?'}>
                    <ul>
                        <li><InternalLink type={'page'} url={'/page/kundtjänst'} title={'Kundtjänst'}>Kundtjänst</InternalLink></li>
                        <li><InternalLink type={'page'} url={'/page/faq'} title={'Vanliga Frågor'}>Vanliga frågor</InternalLink></li>
                        <li><InternalLink type={'page'} url={'/page/shipping-delivery'} title={'Frakt & leverans'}>Frakt & leverans</InternalLink></li>
                        <li><InternalLink type={'page'} url={'/page/returns-exchange'} title={'Retur & byten'}>Retur & byten</InternalLink></li>
                        <li><InternalLink type={'page'} url={'/page/payment'} title={'Betalning'}>Betalning</InternalLink></li>
                        <li><InternalLink type={'page'} url={'/page/reclaims-repairs'} title={'Reklamation & reperationer'}>Reklamation & reperationer</InternalLink></li>
                        <li><InternalLink type={'page'} url={'/page/privacy-policy'} title={'Integritetspolicy & cookies'}>Integritetspolicy & cookies</InternalLink></li>                                                
                    </ul>
                </Widget>                    
                <Widget type={'menu'} title={'Mer om oss'}>
                    <ul>
                        <li><a href="/about-houdini">Om SurfShop</a></li>
                        <li><a href="/about-houdini/contact-us">Kontakta oss</a></li>                                                
                        <li><a href="/stores">Återförsäljare</a></li>
                        <li><a href="/news">Nyheter</a></li>
                    </ul>                    
                </Widget>  
                <Widget type={'social'}>
                    <div>
                        <ul className={'social-list'}>
                            <li>
                                <a href="https://www.facebook.com/HoudiniSportswear" title={'Besök oss på Facebook'} rel="noreferrer noopener" target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 8 14">
                                        <path d="M4.7 14V7.6h2.1l.3-2.5H4.7V3.5c0-.7.2-1.2 1.2-1.2h1.3V.1C7 .1 6.3 0 5.3 0 3.4 0 2.1 1.2 2.1 3.3v1.8H0v2.5h2.1V14h2.6z"></path>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/houdinisportswear" title={'Besök oss på Instagram'} rel="noreferrer noopener" target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 14 14">
                                        <path d="M7 1.3h2.8c.7 0 1.1.1 1.3.2.3.1.6.3.8.5.2.2.4.5.5.8.1.2.2.6.2 1.3v5.6c0 .7-.1 1.1-.2 1.3-.1.3-.3.6-.5.8-.2.2-.5.4-.8.5-.2.1-.6.2-1.3.2H4.2c-.7 0-1.1-.1-1.3-.2-.3-.1-.6-.3-.8-.5-.2-.2-.4-.5-.5-.8-.1-.2-.2-.6-.2-1.3V4.1c0-.7.1-1.1.2-1.3.1-.3.3-.6.5-.8.2-.2.5-.4.8-.5.2-.1.6-.2 1.3-.2H7zM7 0H4.1c-.7 0-1.3.2-1.7.3-.4.2-.8.5-1.2.9-.4.4-.7.8-.8 1.2-.2.5-.3 1-.4 1.7v5.8c0 .7.2 1.3.3 1.7.2.5.4.9.8 1.2.4.4.8.6 1.2.8.4.2 1 .3 1.7.3h5.8c.7 0 1.3-.2 1.7-.3.5-.2.9-.4 1.2-.8.4-.4.6-.8.8-1.2.2-.4.3-1 .3-1.7V4.1c0-.7-.2-1.3-.3-1.7-.2-.5-.4-.9-.8-1.2-.4-.4-.8-.6-1.2-.8-.4-.2-1-.3-1.7-.3C9.1 0 8.9 0 7 0z"></path>
                                        <path d="M7 3.4C5 3.4 3.4 5 3.4 7S5 10.6 7 10.6 10.6 9 10.6 7 9 3.4 7 3.4zm0 5.9c-1.3 0-2.3-1-2.3-2.3 0-1.3 1-2.3 2.3-2.3 1.3 0 2.3 1 2.3 2.3 0 1.3-1 2.3-2.3 2.3z"></path>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com/houdinisports" title={'Besök oss på Twitter'} rel="noreferrer noopener" target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 18 14">
                                        <path d="M5.4 14c6.5 0 10.1-5.4 10.1-10.1v-.5c.7-.5 1.3-1.1 1.8-1.8-.6.3-1.3.5-2 .6.7-.4 1.3-1.1 1.6-2-.7.4-1.4.7-2.2.9C13.9.4 12.9 0 11.9 0c-2 0-3.5 1.6-3.5 3.5 0 .3 0 .5.1.8-3-.1-5.6-1.5-7.3-3.7-.3.6-.5 1.2-.5 1.8 0 1.2.6 2.3 1.6 2.9-.6 0-1.1-.2-1.6-.4C.7 6.6 1.9 8 3.5 8.4c-.3.1-.6.2-.9.2-.2 0-.4 0-.7-.1.4 1.4 1.8 2.4 3.3 2.5-1.2.9-2.7 1.5-4.4 1.5H0c1.6.9 3.4 1.5 5.4 1.5"></path>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/channel/UClS4VifINvcgZpnyXU3S41Q" title={'Besök oss på Youtube'} rel="noreferrer noopener" target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 20 14">
                                        <path d="M19.6 2.2c-.2-.9-.9-1.5-1.8-1.8C16.3 0 10 0 10 0S3.7 0 2.2.4C1.3.6.6 1.3.4 2.2 0 3.7 0 7 0 7s0 3.3.4 4.8c.2.9.9 1.5 1.8 1.8 1.5.4 7.8.4 7.8.4s6.3 0 7.8-.4c.9-.2 1.5-.9 1.8-1.8.4-1.5.4-4.8.4-4.8s0-3.3-.4-4.8zM13.2 7L8 10V4l5.2 3z"></path>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/company/houdini-sportswear/" title={'Besök oss på InternalLinkedin'} rel="noreferrer noopener" target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14px" height="14px" viewBox="0 0 14.03 14">
                                        <path d="M3.14,14H.23V4.65H3.14ZM1.69,3.37A1.69,1.69,0,1,1,3.37,1.69,1.68,1.68,0,0,1,1.69,3.37ZM14,14H11.12V9.45c0-1.08,0-2.48-1.51-2.48S7.87,8.15,7.87,9.37V14H5V4.65H7.75V5.93h0a3,3,0,0,1,2.75-1.51C13.48,4.42,14,6.35,14,8.87Z"></path>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                        <p>Subcribe to our newsletter and be the first to know about products, offers and news.</p>
                        <button className={'button button--outline'}>Sign me up!</button>
                    </div>
                </Widget>              
            </div>                                  
        </footer>
    )
}

export const Footer = memo(FooterComponent);