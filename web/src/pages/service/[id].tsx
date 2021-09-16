import { NextPage } from "next";
import { useGetUserServiceByIdQuery } from "src/generated/graphql";
import { Wrapper } from "../../components/Wrapper";
import withApollo from "../../utils/apollo/withApollo";
import Image from "next/image";
import transparent from "/public/transparent.png";
import { useEffect, useState } from "react";
import { getRandomBetween } from "src/utils";
import dayjs from "dayjs";
import gray from "/public/gray.png";
import { Button } from "src/components/htmlElements";
import { OrderModal } from "src/components/order/OrderModal";

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
            <h1 className="mt-8">{service?.name}</h1>
            <h1 className="mt-8">
              {userService?.price} {userService?.per}
            </h1>
          </div>{" "}
          <div className=" flex flex-0 space-x-4 ">
            <div className=" ">
              <div className="flex space-x-40 rounded-lg border  bg-white dark:bg-dark dark:text-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-5 text-center mt-8">
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
                className=""
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
              className=" items-center flex flex-col bg-white dark:bg-dark dark:text-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-5"
            >
              <div
                className=""
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
                <div className="text-3xl">{user?.username}</div>
                {dayjs(new Date()).diff(user?.lastOnline, "day") * -1 < 2 ? (
                  <div className="bg-green-500 h-8 w-8 rounded-full mr-1"></div>
                ) : (
                  <div className="bg-red-500 h-8 w-8 rounded-full mr-1"></div>
                )}
              </div>
              <div className="flex-col container ">
                <div className="text-sm">services</div>
                <div className="flex flex-0    ">
                  {services?.map((service) => {
                    return (
                      <div
                        style={{
                          position: "relative",
                          width: "90px",
                          height: "70px",
                          maxWidth: "90px",
                          maxHeight: "70px",
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
                  })}
                </div>
                <div className="text-sm">languages</div>
                <div className="flex flex-0 space-x-2  ">
                  {languages?.map((language) => {
                    return (
                      <div className="dark:text-white text-black text-lg">
                        {language.name}
                      </div>
                    );
                  })}
                </div>
                <div className=" flex flex-0 space-x-4">
                  <Button text={"Chat"}></Button>
                  <OrderModal data={data}/>
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
