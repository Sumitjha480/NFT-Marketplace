import Link from "next/link";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function About() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  });
  interface staticsStruct {
    count: string;
    title: string;
  }

  return (
    <div>
      <div className="flex flex-col">
        {/* <span className="text-white text-3xl font-bold">Direct Teams.</span>
        <span className="text-white text-3xl font-bold">
          For Your Dadicated Dreams
        </span> */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-9 mt-8">
          <div
            className="p-6 flex flex-col gap-2 md:gap-5 border border-[#ffffff14] rounded-sm bg-[#242435]"
            data-aos="fade-right"
          >
            <h4 className="font-bold text-3xl text-white">What are NFTs</h4>
            <p className="text-[#acacac]">
              NFTs are virtual tokens that represent ownership of something
              inherently distinct and scarce, whether it be a physical or
              digital item, such as artwork, a soundtrack, a collectible, an
              in-game item or real estate. Unlike regular cryptocurrencies like
              bitcoin or fiat money like the U.S.
            </p>
            <button className="inline w-56 bg-[#13131d] py-3 px-1 rounded-xl text-white hover:bg-[#00a3ff]">
              <Link href="https://ethereum.org/en/nft/" target="blank">Learn More about NFT </Link>
            </button>
          </div>
          <div
            className="p-6 flex flex-col gap-5 border border-[#ffffff14] rounded-sm"
            data-aos="fade-left"
          >
            <h4 className="font-bold text-3xl text-white">
              Helping You Grow In Every Stage.
            </h4>
            <p className="text-[#acacac]">
            According to NonFungible.com, the NFT market capitalization grew from $62.8 million in 2019 to $338 million in 2020, a more than 400% increase.
            In the first quarter of 2021, the NFT market capitalization reached $2 billion, driven in part by high-profile sales of digital art, music, and collectibles.

            </p>
          </div>
          <div className="p-6 flex flex-col" data-aos="fade-right">
            <p className="text-center text-3xl text-white font-bold">
              Create, Sell well and Collect your Wonderful NFTs at NsutPoly Very
              Fast
            </p>
          </div>
          <div
            className="p-6 flex flex-col gap-5 border border-[#ffffff14] rounded-sm"
            data-aos="fade-left"
          >
            <h4 className="font-bold text-3xl text-white">
              Fun Fact
            </h4>
            <p className="text-[#acacac]">
            The largest NFT sale to date was the digital artwork "Everydays: The First 5000 Days" by Beeple, which sold for $69 million at a Christie's auction in March 2021.
            </p>
          </div>
        </div>
      </div>
      {/* <div className="my-8">
        <p className="text-center text-white text-3xl font-bold">
          Nuron Statistics
        </p>
        <div className="px-5 md:px-40 mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto justify-center">
            {statisticsList.map((staticsCardData: staticsStruct) => {
              return (
                <StatisticsCard
                  key={staticsCardData.title}
                  {...staticsCardData}
                />
              );
            })}
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default About;
