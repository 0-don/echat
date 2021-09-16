import { NextPage } from "next";
import { useGetUserServiceByIdQuery } from "src/generated/graphql";
import { Wrapper } from "../../components/Wrapper";
import withApollo from "../../utils/apollo/withApollo";
import Image from "next/image";
import transparent from "/public/transparent.png";
import React, { useEffect, useState } from "react";
import { getRandomBetween } from "src/utils";
import dayjs from "dayjs";
import gray from "/public/gray.png";
import { OrderModal } from "src/components/order/OrderModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
const ServiceDetail: NextPage<{ id: number }> = ({ id }) => {
  const [bgImage, setBgImage] = useState<string | undefined>();
  const { data } = useGetUserServiceByIdQuery({
    variables: { id },
  });
  const userService = data?.getUserServiceById;
  const user = data?.getUserServiceById.user;
  const services = data?.getUserServiceById?.user?.services;
  const service = data?.getUserServiceById.service;
  const images = service?.images?.filter((image) => image.width > 1200);
  const languages = data?.getUserServiceById?.user?.languages;
  const router = useRouter();

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

              <div
                style={{ position: "relative", width: "100%", height: "350px" }}
              >
                <Image
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMUrAcAAKcAkqLcIOsAAAAASUVORK5CYII="
                  layout="fill"
                  objectFit="cover"
                  src={userService?.image ?? transparent.src}
                />
              </div>
            </div>
            <div
              style={{
                width: "400px",
                height: "550px",
              }}
              className=" items-center flex flex-col bg-white dark:bg-dark dark:text-white shadow px-4 py-4 sm:rounded-lg sm:p-6 mb-5"
            >
              <div
                style={{
                  position: "relative",
                  width: "300px",
                  height: "300px",
                  maxWidth: "400px",
                  maxHeight: "300px",
                }}
              >
                <Image
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMUrAcAAKcAkqLcIOsAAAAASUVORK5CYII="
                  layout="fill"
                  objectFit="cover"
                  src={
                    user?.images?.find((image) => image.type == "profile")
                      ?.url ?? transparent.src
                  }
                />
              </div>
              <div className="flex flex-0 space-x-28 text-center">
                <div
                  onClick={() => router.push(`/user/${user?.id}`)}
                  className="text-3xl cursor-pointer text-purple-dark "
                >
                  {user?.username}
                </div>
                {dayjs(new Date()).diff(user?.lastOnline, "day") * -1 < 2 ? (
                  <div className="bg-green-500 h-8 w-8 rounded-full mr-1"></div>
                ) : (
                  <div className="bg-red-500 h-8 w-8 rounded-full mr-1"></div>
                )}
              </div>
              <div className="flex-col container ">
                <div className="flex flex-0 space-x-2  ">
                  <div className="text-lg">Language:</div>
                  {languages?.map((language) => {
                    return (
                      <div
                        key={language.id}
                        className="dark:text-white text-black text-lg "
                      >
                        {language.name}
                      </div>
                    );
                  })}
                </div>
                <FontAwesomeIcon
                  size="lg"
                  className="text-purple opacity-40"
                  icon="angle-double-left"
                />
                <FontAwesomeIcon
                  size="lg"
                  className="text-purple opacity-40"
                  icon="angle-double-right"
                />
                <div className="text-sm">services</div>
                <div className="flex flex-0  space-x-2  ">
                  {services?.map((service, maxItems) => {
                    if (maxItems++ <= 4) {
                      return (
                        <div
                          key={service.id}
                          style={{
                            position: "relative",
                            width: "100px",
                            height: "100px",
                          }}
                        >
                          <Image
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMUrAcAAKcAkqLcIOsAAAAASUVORK5CYII="
                            layout="fill"
                            objectFit="cover"
                            src={
                              service
                                ? "" + service?.service?.boxArtUrl
                                : gray.src
                            }
                          />
                        </div>
                      );
                    } else return <div key={service.id}></div>;
                  })}
                </div>
              </div>
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
