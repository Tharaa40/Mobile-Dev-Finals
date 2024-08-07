import React from "react";
import { Image } from 'expo-image';

export default function CachedImage (props) {
    const { uri, ...otherProps } = props;
    // console.log( "Rendering image with URI: ", uri);
    return <Image source={{ uri }} {...otherProps} />;
}