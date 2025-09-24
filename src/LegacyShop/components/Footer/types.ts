import type React from "react";
import type { AppBarColor, NavBarLink } from "../NavBar/types";

export interface FooterInterface {
  color?: AppBarColor,
  contactMethods?: contactMethodsType[],
  links: NavBarLink[],
  paymentMethods?: logosArrayType[],
  shippingMethods?:  logosArrayType[],
  socialMediaLinks?: socialMediaLink[],
}

export type logosArrayType = {
    id: number,
    name: string,
    url: string,
}

export type contactMethodsType = {
    icon?: React.ReactNode | null,
    text: string,
}

export type socialMediaLink = {
    srcPath: string,
    altText: string,
    link: string,
}