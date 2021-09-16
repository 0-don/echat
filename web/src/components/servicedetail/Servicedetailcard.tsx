import { SRLWrapper } from "simple-react-lightbox";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gray from "/public/gray.png";
import React from "react";
import Image from "next/image";
import dayjs from "dayjs";
import transparent from "/public/transparent.png";
import { useGetUserServiceByIdQuery } from "src/generated/graphql";
import { NextPage } from "next";

const Servicedetailcard: NextPage<{ id: number }> = ({ id }) => {
  const { data } = useGetUserServiceByIdQuery({
    variables: { id },
  });
  const user = data?.getUserServiceById.user;
  const services = data?.getUserServiceById?.user?.services;
  const languages = data?.getUserServiceById?.user?.languages;
  const router = useRouter();
  return (
    <div>
      {" "}
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
          {" "}
          <SRLWrapper>
            <Image
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMUrAcAAKcAkqLcIOsAAAAASUVORK5CYII="
              layout="fill"
              objectFit="cover"
              src={
                user?.images?.find((image) => image.type == "profile")?.url ??
                transparent.src
              }
            />
          </SRLWrapper>
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
                        service ? "" + service?.service?.boxArtUrl : gray.src
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
  );
};

export default Servicedetailcard;
