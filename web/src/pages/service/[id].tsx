import { NextPage } from "next";
import { useGetUserServiceByIdQuery } from "src/generated/graphql";
import { Wrapper } from "../../components/Wrapper";
import withApollo from "../../utils/apollo/withApollo";

import transparent from "/public/transparent.png";
import React, { useEffect, useState } from "react";
import { getRandomBetween } from "src/utils";
import { generateNumber } from "../../utils/index";
import gray from "/public/gray.png";
import { OrderModal } from "src/components/order/OrderModal";

import Servicedetailcard from "src/components/servicedetail/Servicedetailcard";

import { Score } from "src/components/servicedetail/Score";
import { ImagePopup } from "src/components/utils/ImagePopup";
import { Reviews } from "src/components/user/Reviews";
import { Button } from "src/components/htmlElements";

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
        <ImagePopup
          className="img-fade opacity-40"
          src={bgImage ?? transparent.src}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="container max-auto  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 absolute top-0 left-0 right-0">
        <div className="dark:text-white text-black  ">
          <div>
            <h1 className="mt-4 text-lg lg:text-3xl md:text-3xl">
              {service?.name}
            </h1>
            <div className="mt-4 mb-4 flex flex-row  w-full justify-between">
              {userService?.price} {userService?.per}
              <div className="flex space-x-1   ">
                <Button
                  icon="star"
                  text="Chat"
                  className=" flex justify-center  items-center py-2 px-14 border border-opacity-25 rounded-lg shadow-sm text-sm font-medium text-white bg-purple hover:bg-purple-dark "
                />
                <OrderModal data={data} />
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between md:space-x-4 lg:flex-row lg:space-x-4 ">
              <div className="flex flex-col w-full ">
                <Score data={data} rating={generateNumber(0, 5)} />

                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "350px",
                  }}
                >
                  <ImagePopup
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMUrAcAAKcAkqLcIOsAAAAASUVORK5CYII="
                    layout="fill"
                    objectFit="cover"
                    src={userService?.image ?? transparent.src}
                  />
                </div>
              </div>
              {/* <Score id={id} /> */}
              <div className=" ">
                <Servicedetailcard id={id} />
              </div>
            </div>{" "}
            <div className="flex flex-row space-x-20">
              <div className="bg-white text-sm dark:bg-dark dark:text-white shadow px-4 py-4  sm:p-6 mb-5 items-center">
                Details
                <div className="md:flex  md:space-x-10 lg:flex  lg:space-x-10">
                  <div className="flex flex-row space-x-4 ">
                    <div>Level</div>
                    <div>{userService?.level}</div>{" "}
                  </div>
                  <div className="flex flex-row space-x-4 ">
                    <div>
                      <h1>Platform</h1>
                    </div>
                    {userService?.platforms.map((platform: any) => {
                      return <div key={platform.id}> {platform.name}</div>;
                    })}
                  </div>
                </div>
                <div className="">
                  <div>
                    <h1>Introduction</h1>
                  </div>
                  <div className="text-center text-xs">
                    {userService?.description}
                  </div>
                </div>
              </div>
              <div className="bg-white text-sm dark:bg-dark dark:text-white shadow px-4 py-4  sm:p-6 mb-5 items-center">
                asdasdasd
              </div>
            </div>
          </div>{" "}
          <Reviews data={data} rating={generateNumber(0, 5)} />
        </div>{" "}
      </div>
    </Wrapper>
  );
};

ServiceDetail.getInitialProps = ({ query }) => ({
  id: parseInt(query.id as string),
});

export default withApollo({ ssr: false })(ServiceDetail);
