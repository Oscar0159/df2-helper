"use client";

import { Player } from '@lottiefiles/react-lottie-player';

import constructionAnimation from '../../public/lottie/construction.json';

export default function ConstructionAnimation({className} : {className?: string}) {
    return <Player autoplay loop src={constructionAnimation} className={className} />;
}
