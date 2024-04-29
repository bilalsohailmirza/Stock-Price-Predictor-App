
import Section from "./ui/Section"

import image1 from "../public/LandingPage/Finance app-cuate.svg"
import image2 from "../public/LandingPage/Money stress-rafiki.svg"
import image3 from "../public/LandingPage/Finance app-amico.svg"

import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default function Home() {

  let sectionAttributes: { 
    id: number
    heading: string, 
    paragraph: string, 
    image: string | StaticImport

  }[] = [
      { "id": 0, 
        "heading": "Invest Confidently", 
        "paragraph": "Stock buddy is a stock price predicting platform that takes the guess work out of investment decisions by validating them with the use of Artificial Intelligence", 
        "image": image1
      },
      { "id": 1, 
        "heading": "Forget Your Worries", 
        "paragraph": "With StockBuddy by you side, you don't have to worry about losses. Our Artificial Intelligence based suggestions will keep you afloat in the market", 
        "image": image2
      }, 
      { "id": 2, 
        "heading": "Make Profits", 
        "paragraph": "Get busy in making profits with your investments and focus on what matters. It's time to stop doing your own research and let Artificial Intelligence do its job", 
        "image": image2
      },
  ];
  
  // const sectionAttributes : SectionAttributes = {
  //   [
  //     heading: "Invest Confidently", paragraph: "Stock buddy is a stock price predicting platform that takes the guess work out of investment decisions by validating them with the use of Artificial Intelligence",
  //   ]: 
  // }

  // {
  //   heading:string: "Invest Confidently",
  //   paragraph: "Stock buddy is a stock price predicting platform that takes the guess work out of investment decisions by validating them with the use of Artificial Intelligence",
  // },

  return (
    <main className="flex-column items-center justify-between">
      <Section
        heading={sectionAttributes[0].heading}
        paragraph={sectionAttributes[0].paragraph}
        image={image1}
        reverse={false}
      />
      <Section
        heading={sectionAttributes[1].heading}
        paragraph={sectionAttributes[1].paragraph}
        image={image2}
        reverse={true}
      /><Section
        heading={sectionAttributes[2].heading}
        paragraph={sectionAttributes[2].paragraph}
        image={image3}
        reverse={false}
      />
    </main>
  );
}
