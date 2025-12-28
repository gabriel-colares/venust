"use client";

import Script from "next/script";
import { Fragment, type PropsWithChildren } from "react";

export function UmamiProvider({ children }: PropsWithChildren) {
  const isProduction = process.env.NODE_ENV === "production";
  return (
    <Fragment>
      {isProduction && (
        <Script
          src={`${process.env.NEXT_PUBLIC_UMAMI_BASE_URL}/script.js`}
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          strategy="afterInteractive"
        />
      )}
      {children}
    </Fragment>
  );
}
