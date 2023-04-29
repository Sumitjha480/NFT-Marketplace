import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import myTokenAbi from "../../contractAbi/myTokenAbi";
import myNFTAbi from "../../contractAbi/myNFT";
import { useRouter } from "next/router";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSigner } from "wagmi";
import { useProvider } from "wagmi";
import Image from "next/image";
import { RotatingLines } from "react-loader-spinner";
import Web3 from "web3"

// function NFTDetail() {
//   const { data: signer, isError } = useSigner();
//   const provider = useProvider();
//   const router = useRouter();
//   const { tokenId } = router.query;
//   const [NFTData, setNFTData] = useState<any>();
//   const getNFTData = async () => {
//     let marketplaceContact = new ethers.Contract(
//       process.env.NEXT_PUBLIC_MYNFT_ADDRESS || "",
//       myNFTAbi,
//       signer || provider
//     );
//     let tokenContract = new ethers.Contract(
//       process.env.NEXT_PUBLIC_MYTOKEN_ADDRESS || "",
//       myTokenAbi,
//       signer || provider
//     );
//     const data = await marketplaceContact.getListedTokenByTokenId(tokenId);
//     // console.log(data);
//     const tokenURI = await tokenContract.tokenURI(`${tokenId}`);
//     let meta: any = await axios.get(tokenURI);
//     meta = meta.data;
//     // console.log(meta);
//     // const price =await ethers.utils.formatUnits(meta.price.toString(), "ether");
//     const imageUrl = `https://ipfs.io/ipfs/${meta.image.substr(7)}`;
//     let item: any = {
//       price: meta.price,
//       itemId: data.itemId.toNumber(),
//       tokenId: tokenId,
//       seller: data.seller,
//       owner: data.owner,
//       image: imageUrl,
//       name: meta.name,
//       description: meta.description,
//     };
//     setNFTData(item);
//     console.log(item);
//   };


//   useEffect(() => {
//     if (tokenId) {
//       console.log(tokenId);

//       getNFTData();
//     }
//   }, [tokenId]);



//   async function buyNFT() {
//  const price = ethers.utils.parseUnits((0.01).toString(), 'ether')
//     let transaction = await NFTData.marketplaceContact.methods.executeSale(
//       process.env.NEXT_PUBLIC_MYTOKEN_ADDRESS,
//       tokenId,
//       {
//         value: tokenId
//       }
//       );
//     await transaction.wait()
//     // loadNFTs()
//     NFTDetail()

//   }
function NFTDetails() {
    const { data: signer, isError } = useSigner();
  const provider = useProvider();
  const router = useRouter();
  const { tokenId } = router.query;
  const [NFTData, setNFTData] = useState<any>();
  // const { kit, address, network, performActions } = useCelo();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBuyingLoading, setIsBuyingLoading] = useState<boolean>(false);
  useEffect(() => {
    if (tokenId) {
      getNFTDetails();
    }
  }, [tokenId]);

  const getNFTDetails = async () => {
    setIsLoading(true);
    try {
      let marketplaceContact = new ethers.Contract(
              process.env.NEXT_PUBLIC_MYNFT_ADDRESS || "",
              myNFTAbi,
              signer || provider
            );
            let tokenContract = new ethers.Contract(
              process.env.NEXT_PUBLIC_MYTOKEN_ADDRESS || "",
              myTokenAbi,
              signer || provider
            );

      let nfts = await marketplaceContact
        .getListedTokenByTokenId(tokenId)
        // .call();
      const tokenURI = await tokenContract
        .tokenURI(`${tokenId}`)
        // .call();
      let meta: any = await axios.get(tokenURI);
      meta = meta.data;
      const imageUrl = `https://ipfs.io/ipfs/${meta.image.substr(7)}`;
      let item = {
        price: meta.price,
        itemId: nfts.itemId,
        tokenId: tokenId,
        seller: nfts.seller,
        owner: nfts.owner,
        image: imageUrl,
        name: meta.name,
        description: meta.description,
      };
      setNFTData(item);
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setIsLoading(false);
    }
  };

  const buyNFT = async () => {
    setIsBuyingLoading(true);
    try {
      let marketplaceContact = new ethers.Contract(
        process.env.NEXT_PUBLIC_MYNFT_ADDRESS || "",
        myNFTAbi,
        signer || provider
      );
      let price = Web3.utils.toWei(NFTData.price.toString(), "ether");
      const result3 = await marketplaceContact
        .executeSale(process.env.NEXT_PUBLIC_MYTOKEN_ADDRESS, NFTData.itemId)
        // .send({ from: address, value: price });
      setIsBuyingLoading(false);
      toast.success("NFT create successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      toast.error((error as Error).message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setIsBuyingLoading(false);
    }
  };
  return (
    <div> <ToastContainer />
    <div className="">
      <span className="text-white text-3xl font-bold">Product Details</span>
      {NFTData ? (
        <div className="grid grid-cols-2 mt-8">
          <div>
            <Image src={NFTData.image} alt="" height={450} width={450} />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <h3 className="text-3xl text-white font-bold">{NFTData.name}</h3>
              <span className="text-white flex my-auto p-2 bg-[#242435] rounded-md">
                <FaHeart className="mt-1 mr-1" />
                0
              </span>
            </div>
            <span className="text-[#00a3ff]">{NFTData.price}Matic</span>
            <span className="text-white font-bold">
              Category <span className="text-[#acacac]"> royalties</span>
            </span>
            <p className="text-[#acacac]">{NFTData.description}</p>
            <p className="text-[#acacac]">
              <span className="text-white">Seller:</span> {NFTData.seller}
            </p>
            <button
                onClick={buyNFT}
              className="inline w-32 bg-[#212e48] py-2 px-2 rounded-xl text-white hover:bg-[#00a3ff]"
            >
              Buy Now
            </button>
            <ToastContainer theme="dark" />
          </div>
        </div>
      ) : (
        <span className="flex justify-center my-auto">
          {" "}
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />{" "}
        </span>
      )}
    </div>
    </div>
  );
}

export default NFTDetails;
