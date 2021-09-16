import { NextPage } from "next";
import { useGetUserServiceByIdQuery } from "src/generated/graphql";
import { Wrapper } from "../../components/Wrapper";
import withApollo from "../../utils/apollo/withApollo";
import Image from "next/image";
import transparent from "/public/transparent.png";
import React, { useEffect, useState } from "react";
import { getRandomBetween } from "src/utils";

import gray from "/public/gray.png";
import { OrderModal } from "src/components/order/OrderModal";

import { SRLWrapper } from "simple-react-lightbox";
import Servicedetailcard from "src/components/servicedetail/Servicedetailcard";
const ServiceDetail: NextPage<{ id: number }> = ({ id }) => {
  const [bgImage, setBgImage] = useState<string | undefined>();
  const { data } = useGetUserServiceByIdQuery({
    variables: { id },
  });
  const userService = data?.getUserServiceById;

  const services = data?.getUserServiceById?.user?.services;
  const service = data?.getUserServiceById.service;
  const images = service?.images?.filter((image) => image.width > 1200);

  services;
  gray;
  useEffect(() => {
    images?.length &&
      setBgImage(images[getRandomBetween(0, images.length)].url);
  }, [images]);

  return (
    <Wrapper navbar fluid className="relative">
      <div style={{ position: "relative", width: "100%", height: "40vw" }}>
        <Image
          className="img-fade opacity-40"
          src={bgImage ?? transparent.src}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="container max-auto  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 absolute top-0 left-0 right-0">
        <div className="dark:text-white text-black text-4xl ">
          <div>
            <h1 className="mt-4 ">{service?.name}</h1>
            <div className="mt-4 mb-4 flex   w-full justify-between">
              {userService?.price} {userService?.per}
              <div className="flex space-x-4">
                <button className=" flex justify-center  items-center py-2 px-20 border border-opacity-25 rounded-lg shadow-sm text-sm font-medium text-white bg-purple hover:bg-purple-dark ">
                  Chat
                </button>
                <OrderModal data={data} />
              </div>
            </div>
          </div>
          <div className=" flex flex-0 space-x-4 ">
            <div className=" ">
              <div className="inset-x-0 top-0 flex space-x-40 rounded-lg border  bg-white dark:bg-dark dark:text-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-3 text-center ">
                <div>
                  <h1>Review Score</h1>
                  <h2>5.0/5.0</h2>
                </div>
                <div>
                  <h1>Served</h1>
                  <h2>52</h2>
                </div>
                <div>
                  <h1>Recommended</h1>
                  <h2>51</h2>
                </div>
              </div>
              <SRLWrapper>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "350px",
                  }}
                >
                  <Image
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMUrAcAAKcAkqLcIOsAAAAASUVORK5CYII="
                    layout="fill"
                    objectFit="cover"
                    src={userService?.image ?? transparent.src}
                  />
                </div>
              </SRLWrapper>
            </div>

            <div
              style={{
                width: "400px",
                height: "550px",
              }}
              className=" items-center flex flex-col bg-white dark:bg-dark dark:text-white shadow px-4 py-4 sm:rounded-lg sm:p-6 mb-5"
            >
              <Servicedetailcard id={id} />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

ServiceDetail.getInitialProps = ({ query }) => ({
  id: parseInt(query.id as string),
});

export default withApollo({ ssr: false })(ServiceDetail);
