import type React from "react";


export type logosArrayType = {
    id: number,
    name: string,
    url: string,
}

export type contactMethodsType = {
    icon: React.ReactNode,
    text: string,
}

export type socialMediaLink = {
    srcPath: string,
    altText: string,
    link: string,
}