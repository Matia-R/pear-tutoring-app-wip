import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ClerkProvider } from "@clerk/nextjs"
import { api } from "~/utils/api"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import "~/styles/globals.css";
import "~/styles/Home.css"
import "~/styles/VerificationCodeInput.css"

/**
 * Browser script that sets a css variable --scrollbar-width
 * On some browsers/OS the scrollbar is overlayed on top of viewport so 100vw causes overflow
 * Avoid using 100vw, but if needed, subtract --scrollbar-width to it
 * Use 100% instead wherever possible
 */

if (typeof window !== "undefined") {
  const scroller = document.scrollingElement as HTMLElement;

  // Force scrollbars to display
  scroller.style.setProperty('overflow', 'scroll');

  // Wait for next from so scrollbars appear
  requestAnimationFrame(() => {

    // Width of the scrollbar
    scroller.style
      .setProperty(
        '--scrollbar-width',
        `${String(window.innerWidth - scroller.clientWidth)}px`
      );

    // Reset overflow
    scroller.style
      .setProperty(
        'overflow',
        ''
      );
  });

}

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <ClerkProvider {...pageProps} appearance={{
      variables: {
        colorPrimary: "#04AA46"
      },
    }}>
      <ReactQueryDevtools initialIsOpen={true} />
      {
        getLayout(<Component {...pageProps} />)
      }
    </ClerkProvider>
  )
};

/**
 * TODO: figure out a way to get MyApp to be passed to withTRPC as proper
 * type: withTRPC expects NextComponent<any, any, any> but MyApp is 
 * type ({ Component, pageProps }: AppPropsWithLayout) => ReactNode
 */

// @ts-ignore
export default api.withTRPC(MyApp);
