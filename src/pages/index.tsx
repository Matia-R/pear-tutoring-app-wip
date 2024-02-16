import type { GetStaticProps } from "next";
import Image from "next/image";
import Head from "next/head";
import { Button } from "~/components/common/Button";
import { supabase } from "~/utils/supabase";
import type { ReactElement } from 'react'
import Layout from "~/components/layout/Layout";
import type { NextPageWithLayout } from './_app'
import { api } from "~/utils/api";

export const getStaticProps: GetStaticProps = () => {
  const { data: pearHeroImageData } = supabase.storage.from('static-images-public').getPublicUrl('/pear_hero.svg')
  return {
    props: {
      pearHeroImageUrl: pearHeroImageData.publicUrl,
    }
  }
}

const getPairedButtonHandler: React.MouseEventHandler<HTMLButtonElement> = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  window.location.href = '/sign-up';
}

const Home: NextPageWithLayout = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" })
  console.log(hello.data)

  return (
    <>
      <Head>
        <title>Pear Tutoring</title>
        <meta name="description" content="Pear Tutoring" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hero-div">
        <div className="flex justify-center text-white">
          <h1 className="text-3xl my-7">Learn From Home</h1>
        </div>
        <div className="px-10 sm:px-40">
          <h2 className="justify-center flex text-white text-xl text-center mb-7">
            We pair students with the tutor that fits their needs best. With the convenience and accessibility of online learning, our personalized e-tutoring provides quality assistance anytime, anywhere.
          </h2>
        </div>
        <div className="flex justify-center mb-7">
          {/* TODO: find good tailwind size that scales and get rid of hero-img css class */}
          <Image className="hero-img" src={'/img/pear_hero_img.svg'} alt="tutoring lesson" width={45} height={45} />
        </div>
        <div className="flex justify-center">
          <Button
            onClick={getPairedButtonHandler}
            buttonStyle='btn-white-flashy'
            buttonSize="btn-large">
            Get Paired
          </Button>
        </div>
        <div className="custom-shape-divider-bottom-1662412406">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z" className="shape-fill"></path>
          </svg>
        </div>
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Home;
