import { SRLWrapper } from "simple-react-lightbox";

import React from "react";
import Image from "next/image";

import transparent from "/public/transparent.png";
import { useGetUserServiceByIdQuery } from "src/generated/graphql";
import { NextPage } from "next";

const Servicedetailcard: NextPage<{ id: number }> = ({ id }) => {
  const { data } = useGetUserServiceByIdQuery({
    variables: { id },
  });
  const userService = data?.getUserServiceById;

  return (
    <div>
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
      </div>
    </div>
  );
};

export default Servicedetailcard;
