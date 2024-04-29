import Image from "next/image";
import { Poppins, Roboto } from "next/font/google";
import clsx from 'clsx'

import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";

import heroImg from "../../public/LandingPage/Finance app-cuate.svg"
import { StaticImport } from "next/dist/shared/lib/get-img-props";


const poppins = Poppins({weight: "800", subsets: ["latin"]})
const roboto = Roboto({ weight: "400", style: "normal", subsets: ["cyrillic"] })

export default function Section(props
    // {
    // sectionAttributes,
    // }: {
    //   sectionAttributes?:{
    //     heading?: string
    //     paragraph?: string
    //     image?: string | StaticImport
    //   }
    // }
    ) {

  return (
    <main className="flex items-center justify-between my-8 sm:my-12 lg:my-16
                   "
    >
{/*       
      <Container className="flex py-3 px-4 border-b margin-inline-auto overflow-hidden">

        <div className="items-center
                        px-8 sm:px-12 lg:px-24
                        mt-8 sm:mt-12 lg:mt-24
                        w-full sm:w-3/5 lg:1/2"
        >
          <h1 
          className="py-2 sm:py-4 lg:py12
                    text-3xl sm:text-4xl lg:text-6xl
                    font-bold"
          > 
            Invest Confidently
          </h1>
          <p 
          className="py-2 sm:py-4 lg:py12"
          >
            Stock buddy is a stock price predicting platform that takes the guess work out of investment decisions by validating them with the use of Artificial Intelligence
          </p>
        </div>
        <div className="flex items-center w-3/5 mr-6">

          <Image
            className="d-flex"
            src={heroImg}
            width={250}
            height={856}
            alt="Illustration of Man Standing next to Phone"
            />

        </div>
        
        
      </Container> */}
      


    <div className={clsx('flex flex-col gap-x-6 mb-8 sm:mb-12 lg:mb-16',
                    props.reverse === false && 'sm:flex-row-reverse',
                    props.reverse === true && 'sm:flex-row',
                    )}
    >

        <Image
            src={props.image}
            alt="Illustration of Man Standing next to Phone"
            className="hidden w-2/5 mr-4 sm:block"
        />

        <div className="items-center
                        px-8 sm:px-12 lg:px-24
                        mt-8 sm:mt-12 lg:mt-24
                        sm:w-3/5"
        >

          <h1 className="py-2 sm:py-4 lg:py12
                      text-3xl sm:text-4xl lg:text-5xl
                      font-bold text-blue-700">
            {props.heading}
          </h1>
          <p className="py-2 sm:py-4 lg:py12 text-[18px]">
            {props.paragraph}
          </p>
          {/* <Button size="lg" className="my-4 sm:my-8">
            Get Started
        </Button> */}

          <Image
              src={props.image}
              alt="Illustration of Man Standing next to Phone"
              className="pt-[24px] sm:hidden"
          />
        </div>

      </div>
    </main>
  );
}
