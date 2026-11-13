'use client'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { ThreeDMarquee } from './3dMarquee'

gsap.registerPlugin(ScrollTrigger)

export default function ParallaxBackground() {
    const marqueeRef = useRef(null)

    const images = [
        "/I1.webp", "/JAVA.avif", "/C.webp", "/JS.webp", "/java2.webp", "/DS.webp", "/CS.webp", "/MEAN.webp", "/JS.webp", "/CC.webp", "/AI.webp", "/ANDROID.webp", "/ML.webp", "/MEAN.webp", "/AI.webp", "/I2.webp", "/CC.webp", "/JS.webp", "/DS.webp", "/CC.webp",
        "/MERN.webp", "/I3.webp", "/CC.webp", "/AI.webp", "/MERN2.webp", "/ANDROID2.webp", "/PHP.webp", "/I2.webp", "/java2.webp", "/C.webp",
        "/JS.webp", "/CC.webp", "/DS.webp", "/CS.webp", "/MERN.webp", "/I2.webp", "/i5.webp", "/CC.webp",
    ]

    useEffect(() => {
        gsap.fromTo(
            marqueeRef.current,
            { scale: 1.2 },
            {
                scale: 2.7,
                ease: 'none',
                scrollTrigger: {
                    trigger: marqueeRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            }
        )
    }, [])

    return (
        <section className="absolute inset-0 -z-10 lg:mt-30 h-auto md:min-h-screen max-h-screen border-b-black">
            <div className="relative h-[400px] md:h-[480px] lg:min-h-[20vh] overflow-hidden">
                <div
                    ref={marqueeRef}
                    className="absolute inset-0 w-full h-full -z-10 will-change-transform bg-white overflow-hidden transform-border duration-100 ease-in-out"
                >
                    <ThreeDMarquee images={images} />
                </div>
            </div>
        </section>
    )
}
