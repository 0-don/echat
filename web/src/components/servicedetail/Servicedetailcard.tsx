import { useRouter } from "next/router";

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
      <div className=" w-[350px] h-[500px] sm:w-[400px] sm:h-[550px] items-center flex flex-col bg-white dark:bg-dark dark:text-white shadow px-4 py-4  sm:p-6 mb-5">
        <div className="relative w-[300px] h-[300px]  max-w-[300px] max-h-[300px] ">
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
        </div>

        <div className="flex  space-x-10 text-center">
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

          <div className="text-lg text-center">Services</div>
          {/* <div className="flex flex-0  space-x-2  "> */}
          <div className="flex flex-0  space-x-2  ">
            {services?.map((service) => {
              return (
                <div
                  key={service.id}
                  onClick={() => router.push(`/service/${service.id}`)}
                  style={{
                    position: "relative",
                    width: "50px",
                    height: "50px",
                  }}
                >
                  <Image
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMUrAcAAKcAkqLcIOsAAAAASUVORK5CYII="
                    layout="fill"
                    objectFit="cover"
                    src={service ? "" + service?.service?.boxArtUrl : gray.src}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Servicedetailcard;
