"use client";

import Link from "next/link";
import Image from "next/image";
import {motion} from "motion/react";
import {useEffect, useRef} from "react";
import type {Locale} from "@/i18n/routing";
import {localizedPath} from "@/lib/site";

type HomeHeroProps = {
  locale: Locale;
};

const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const VIDEO_URL = "/videos/topone-hero-1080p-v1.mp4";
const VIDEO_POSTER_URL = "/images/topone-hero-video-poster.jpg";
const MAP_URL = "/images/topone-route-map.png";

const routes = [
  "M128.161 74.6764C79.9989 130.001 71.9994 46.0005 20.9815 111.737",
  "M216.999 9.99985C260.499 12.4998 222.499 71.9998 291.999 58.9998",
  "M130.102 70.9998C144.499 -32.0002 183.852 70.2739 219.999 3.99985",
  "M14.4999 16.9998C111 20.9998 -53.0003 73.4998 21.4999 107"
];

const stops = [
  [9.519, 15.519],
  [289.519, 59.518],
  [220.519, 9.519],
  [125.518, 78.519],
  [19.519, 104.519]
];

const transportIcons = [
  {
    name: "Ship",
    left: "26%",
    top: "28.9%",
    delay: 2.1,
    transform: "none",
    src: "/images/topone-hero-ship.png"
  },
  {
    name: "Truck",
    left: "70.8%",
    top: "15.6%",
    delay: 2.2,
    transform: "rotate(9.73deg)",
    src: "/images/topone-hero-truck.png"
  },
  {
    name: "Plane",
    left: "55.2%",
    top: "52.1%",
    delay: 2.3,
    transform: "rotate(180deg) scaleY(-1)",
    src: "/images/topone-hero-plane.png"
  }
];

function WordReveal({text, delay}: {text: string; delay: number}) {
  return (
    <span className="inline-flex overflow-hidden pb-[0.08em] [perspective:500px]">
      {text.split(" ").map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block"
          initial={{y: "100%", rotateX: 45}}
          animate={{y: 0, rotateX: 0}}
          transition={{duration: 0.6, delay: delay + index * 0.08, ease: EXPO_OUT}}
        >
          {word}
          {index < text.split(" ").length - 1 ? "\u00a0" : ""}
        </motion.span>
      ))}
    </span>
  );
}

function RouteMap() {
  return (
    <div className="relative w-full" style={{aspectRatio: "435 / 263"}}>
      {/* The supplied artwork is intentionally rendered as a plain image so its exact crop is preserved. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={MAP_URL}
        alt="TopOne Logistic global transport routes"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-contain"
      />

      <div
        className="pointer-events-none absolute"
        style={{left: "13.8%", top: "24.3%", width: "68.7%", aspectRatio: "299 / 143"}}
      >
        <svg viewBox="0 0 299.037 142.509" className="h-full w-full overflow-visible" fill="none">
          {routes.map((path, index) => (
            <motion.path
              id={`cargo-route-${index}`}
              key={path}
              d={path}
              stroke="#FFDA00"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{pathLength: 0}}
              animate={{pathLength: 1}}
              transition={{duration: 1.1, delay: 0.55 + index * 0.12, ease: EXPO_OUT}}
            />
          ))}

          {routes.map((path, index) => (
            <polygon key={`arrow-${path}`} points="0,-4 8,0 0,4" fill="#FFDA00">
              <animateMotion dur={`${2.5 + index * 0.3}s`} repeatCount="indefinite" rotate="auto">
                <mpath href={`#cargo-route-${index}`} />
              </animateMotion>
            </polygon>
          ))}

          {stops.map(([cx, cy], index) => (
            <motion.g
              key={`${cx}-${cy}`}
              initial={{scale: 0}}
              animate={{scale: 1}}
              transition={{delay: 1.25 + index * 0.1, type: "spring", stiffness: 420, damping: 14}}
              style={{transformOrigin: `${cx}px ${cy}px`}}
            >
              <circle cx={cx} cy={cy} r="9.519" fill="#FFDA00" />
              <circle cx={cx} cy={cy} r="3.389" fill="#002A35" />
            </motion.g>
          ))}
        </svg>
      </div>

      {transportIcons.map((icon) => (
        <motion.div
          key={icon.name}
          className="absolute aspect-square w-[14.9%] cursor-pointer rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
          style={{left: icon.left, top: icon.top}}
          initial={{opacity: 0, scale: 0}}
          animate={{opacity: 1, scale: 1}}
          transition={{delay: icon.delay, type: "spring", stiffness: 220, damping: 16}}
          whileHover={{scale: 1.12, y: -4, boxShadow: "0 10px 24px rgba(0,0,0,0.24)"}}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={icon.src}
            alt={icon.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full rounded-full object-contain"
            style={{transform: icon.transform}}
          />
        </motion.div>
      ))}

      <motion.p
        className="absolute left-[55.6%] top-[89%] hidden w-[44%] text-[#002a35] sm:block"
        style={{fontSize: "clamp(12px, min(1.6vh, 1.2vw), 20px)"}}
        initial={{opacity: 0, y: 10}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.6, delay: 2.4, ease: EXPO_OUT}}
      >
        We ensure full transparency at every stage to build trust and drive results.
      </motion.p>
    </div>
  );
}

function ContactButton({href}: {href: string}) {
  return (
    <motion.div
      className="w-full sm:w-auto"
      initial={{opacity: 0, x: 60}}
      animate={{opacity: 1, x: 0}}
      transition={{duration: 0.65, delay: 0.5, ease: EXPO_OUT}}
      whileHover={{scale: 1.08, y: -2}}
      whileTap={{scale: 0.97}}
    >
      <Link
        href={href}
        className="group relative block h-14 w-full sm:h-[clamp(48px,min(6vh,4.5vw),68px)] sm:aspect-[434/68] sm:w-auto"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 434.001 68"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <path
            fill="#ffda00"
            d="M316 0C329.08 0 340.435 7.38674 346.121 18.2162C348.618 22.9736 353.086 26.8535 358.459 26.8535H359.252C364.667 26.8535 369.155 22.9169 371.63 18.1007C377.159 7.34039 388.205 0.00015843 400.931 0C419.195 0 434.001 15.1191 434.001 33.7695L433.99 34.6416C433.537 52.8891 418.909 67.5391 400.931 67.5391C387.96 67.5389 376.734 59.9132 371.317 48.8128C368.923 43.9077 364.427 39.873 358.969 39.873C353.492 39.873 348.986 43.9356 346.589 48.8605C341.074 60.1913 329.449 68 316 68H34.001C15.2233 68 0 52.7777 0 34C0 15.2223 15.2233 0 34.001 0H316ZM400.931 2.44141C384.063 2.44163 370.303 16.419 370.303 33.7695C370.303 51.1201 384.063 65.0974 400.931 65.0977C417.798 65.0977 431.56 51.1202 431.56 33.7695C431.56 16.4189 417.798 2.44141 400.931 2.44141Z"
          />
        </svg>
        <span
          className="absolute inset-y-0 left-0 flex w-[82.7%] items-center justify-center text-[#002a35]"
          style={{fontSize: "clamp(14px, min(1.6vh, 1.2vw), 20px)"}}
        >
          Get in touch
        </span>
        <span className="absolute right-[3.6%] top-1/2 flex h-[48%] w-[8%] -translate-y-1/2 items-center justify-center">
          <svg
            viewBox="0 0 16.89 20.37"
            className="h-full w-full -rotate-[135deg] transition-transform duration-[350ms] group-hover:-rotate-90"
            fill="none"
          >
            <path d="M8.445 19V2M1.5 8.5 8.445 1.5 15.39 8.5" stroke="white" strokeWidth="2.2" />
          </svg>
        </span>
      </Link>
    </motion.div>
  );
}

export function HomeHero({locale}: HomeHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const experienceCopy =
    locale === "zh"
      ? ["年货代行业经验", "支持每一票", "中国起运业务"]
      : ["years of freight", "forwarding experience", "behind every shipment"];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let playbackTimer: number | undefined;
    const startPlayback = () => {
      playbackTimer = window.setTimeout(() => {
        const playPromise = video.play();
        playPromise?.catch(() => {
          // Autoplay or media failures are non-blocking: the poster and Hero content stay visible.
        });
      }, 300);
    };

    if (document.readyState === "complete") startPlayback();
    else window.addEventListener("load", startPlayback, {once: true});

    return () => {
      if (playbackTimer) window.clearTimeout(playbackTimer);
      window.removeEventListener("load", startPlayback);
    };
  }, []);

  return (
    <section
      data-motion-static
      className="relative flex min-h-screen min-h-[100svh] flex-col overflow-hidden"
      style={{backgroundColor: "#002a35"}}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 z-[1] h-full w-full object-cover"
        poster={VIDEO_POSTER_URL}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      <motion.div
        className="flex w-full flex-1 flex-col"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.3}}
      >
            <div
              className="relative z-10 grid flex-1 grid-cols-1 lg:grid-cols-[2.17fr_1fr]"
              style={{
                padding: "clamp(128px, 17vh, 180px) clamp(16px, 3vw, 48px) 0",
                gap: "clamp(20px, 4vh, 48px)"
              }}
            >
              <h1
                className="overflow-clip uppercase tracking-[-0.01em]"
                style={{
                  fontFamily: 'var(--font-barlow-condensed), Impact, "Arial Narrow", sans-serif',
                  fontWeight: 800,
                  fontSize: "clamp(86px, min(14vh, 11vw), 220px)",
                  lineHeight: 0.78
                }}
              >
                <span className="sr-only">TopOne Logistic — China freight forwarder. </span>
                <motion.span
                  className="block whitespace-nowrap text-white"
                  initial={{x: -900}}
                  animate={{x: 0}}
                  transition={{duration: 0.85, delay: 0, ease: EXPO_OUT}}
                >
                  BEYOND
                </motion.span>
                <motion.span
                  className="block whitespace-nowrap text-[#002a35]"
                  style={{marginLeft: "0.524em"}}
                  initial={{x: 900}}
                  animate={{x: 0}}
                  transition={{duration: 0.85, delay: 0.13, ease: EXPO_OUT}}
                >
                  BORDERS
                </motion.span>
                <motion.span
                  className="block whitespace-nowrap text-white"
                  initial={{x: -900}}
                  animate={{x: 0}}
                  transition={{duration: 0.85, delay: 0.26, ease: EXPO_OUT}}
                >
                  AND LIMITS
                </motion.span>
              </h1>

              <div className="flex flex-col" style={{gap: "clamp(16px, 2.66vh, 32px)"}}>
                <div
                  className="flex flex-col text-[#002a35] tracking-[-0.02em]"
                  style={{fontSize: "clamp(24px, min(4vh, 3vw), 52px)", lineHeight: 0.9}}
                >
                  <span><WordReveal text="Logistics" delay={0.3} /></span>
                  <span style={{marginLeft: "1.5em"}}><WordReveal text="shaped by scale" delay={0.5} /></span>
                  <span><WordReveal text="powered by precision" delay={0.7} /></span>
                </div>
                <RouteMap />
              </div>
            </div>

            <footer
              className="relative z-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
              style={{padding: "clamp(12px, 3vh, 32px) clamp(16px, 3vw, 48px) clamp(16px, 5vh, 66px)"}}
            >
              <motion.div
                className="flex items-center gap-3 sm:gap-4"
                initial={{opacity: 0, y: 24}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.65, delay: 0.45, ease: EXPO_OUT}}
              >
                <span
                  className="uppercase text-[#ffda00]"
                  style={{
                    fontFamily: 'var(--font-barlow-condensed), Impact, "Arial Narrow", sans-serif',
                    fontWeight: 800,
                    fontSize: "clamp(52px, min(8vh, 6vw), 98px)",
                    lineHeight: 0.75
                  }}
                >
                  18+
                </span>
                <p
                  className="text-white"
                  style={{fontSize: "clamp(16px, min(1.6vh, 1.2vw), 20px)", lineHeight: 1.25}}
                >
                  {experienceCopy[0]}<br />{experienceCopy[1]}<br />{experienceCopy[2]}
                </p>
                <div
                  className="grid shrink-0 place-items-center overflow-hidden rounded-full bg-white"
                  style={{width: "clamp(40px, min(5.5vh, 4vw), 67px)", aspectRatio: 1}}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/topone-hero-cargo.png"
                    alt="Cargo"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain"
                  />
                </div>
              </motion.div>

              <ContactButton href={localizedPath(locale, "/contact")} />
            </footer>
      </motion.div>
    </section>
  );
}
