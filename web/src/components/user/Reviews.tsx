import React from "react";
import { GetUserQuery } from "src/generated/graphql";
import { getRandomBetween } from "src/utils";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
interface ReviewsProps {
  data: GetUserQuery | undefined;
  rating: number;
}

export const Reviews: React.FC<ReviewsProps> = ({ data, rating }) => {
  data;

  const ratingStar = (star: number) => (
    <FontAwesomeIcon
      size="sm"
      className={`${rating > star ? "text-yellow-500" : "text-dark-light"}`}
      icon={
        `${
          rating > star && rating < star + 1 ? "star-half-alt" : "star"
        }` as IconProp
      }
    />
  );

  return (
    <div className="mt-5">
      <div className="flex justify-between items-end">
        <h2 className="text-3xl">Comment {getRandomBetween(3, 40)}</h2>
        <h5 className="text-xl">{rating.toFixed(1)} Score</h5>
      </div>

      <div className="flex flex-wrap space-x-5  mt-2">
        <p className="rounded-full bg-dark-light px-2 py-0.5 text-xs mt-2">
          Fast Response (12)
        </p>
        <p className="rounded-full bg-dark-light px-2 py-0.5 text-xs mt-2">
          Interactive (8)
        </p>
        <p className="rounded-full bg-dark-light px-2 py-0.5 text-xs mt-2">
          Humorous (13)
        </p>
        <p className="rounded-full bg-dark-light px-2 py-0.5 text-xs mt-2">
          Carry in Game (2)
        </p>
        <p className="rounded-full bg-dark-light px-2 py-0.5 text-xs mt-2">
          Turn the Tide (3)
        </p>
        <p className="rounded-full bg-dark-light px-2 py-0.5 text-xs mt-2">
          Cooperative (75)
        </p>
        <p className="rounded-full bg-dark-light px-2 py-0.5 text-xs mt-2">
          Creative (12)
        </p>
      </div>

      <div className="bg-white dark:bg-dark dark:text-white shadow sm:rounded-lg p-3 px-5 my-5">
        <div className="flex space-x-3">
          <Image
            width={"40"}
            height={"40"}
            layout="fixed"
            objectFit="fill"
            className="rounded-full"
            src="https://placeimg.com/640/480/9cb72f59-0586-4328-89df-c0991be4eccd"
          />
          <div className="flex flex-col">
            <p className="text-xl">d***r</p>
            <p className="text-gray-300">2 days ago</p>
            <div className="flex items-center space-x-2">
              {ratingStar(0)}
              {ratingStar(1)}
              {ratingStar(2)}
              {ratingStar(3)}
              {ratingStar(4)}
              <p>{rating + " score | Recomend"}</p>
            </div>
            <p>
              She was a sweetheart and very cooperative in a game play. One of
              the best experiences I've had on this site. Would recommend.
            </p>

            <div className="flex flex-wrap space-x-5  mt-2">
              <p className="rounded-full bg-dark-light px-2 py-0.5 text-xs mt-2">
                Fast Response
              </p>
              <p className="rounded-full bg-dark-light px-2 py-0.5 text-xs mt-2">
                Interactive
              </p>
              <p className="rounded-full bg-dark-light px-2 py-0.5 text-xs mt-2">
                Humorous
              </p>
              <p className="rounded-full bg-dark-light px-2 py-0.5 text-xs mt-2">
                Carry in Game
              </p>
              <p className="rounded-full bg-dark-light px-2 py-0.5 text-xs mt-2">
                Turn the Tide
              </p>
              <p className="rounded-full bg-dark-light px-2 py-0.5 text-xs mt-2">
                Cooperative
              </p>
              <p className="rounded-full bg-dark-light px-2 py-0.5 text-xs mt-2">
                Creative
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-dark dark:text-white shadow sm:rounded-lg p-3 px-5 my-5">
        <div className="flex space-x-3">
          <Image
            width={"40"}
            height={"40"}
            layout="fixed"
            objectFit="fill"
            className="rounded-full"
            src="https://placeimg.com/640/480/9cb72f59-0586-4328-89df-c0991asdabe4eccd"
          />
          <div className="flex flex-col">
            <p className="text-xl">y***x</p>
            <p className="text-gray-300">3 days ago</p>
            <div className="flex items-center space-x-2">
              {ratingStar(0)}
              {ratingStar(1)}
              {ratingStar(2)}
              {ratingStar(3)}
              {ratingStar(4)}
              <p>{rating + " score | Recomend"}</p>
            </div>
            <p></p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-dark dark:text-white shadow sm:rounded-lg p-3 px-5 my-5">
        <div className="flex space-x-3">
          <Image
            width={"40"}
            height={"40"}
            layout="fixed"
            objectFit="fill"
            className="rounded-full"
            src="https://placeimg.com/640/480/9cb72f59-0586-4328-89df-c0991be4ecasdcd"
          />
          <div className="flex flex-col">
            <p className="text-xl">b***t</p>
            <p className="text-gray-300">2 days ago</p>
            <div className="flex items-center space-x-2">
              {ratingStar(0)}
              {ratingStar(1)}
              {ratingStar(2)}
              {ratingStar(3)}
              {ratingStar(4)}
              <p>{rating + " score | Recomend"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
