/* eslint-disable react/jsx-no-undef */
import Image from "next/image";

import { Card, CardHeader } from "@nextui-org/react";
import { IconArrowBadgeRight } from "@tabler/icons-react";

import getMarkaDetails from "@/app/actions/getmarkadets";
import getMarkaVers from "@/app/actions/getmarkavers";
import getPaket from "@/app/actions/getpaket";

type Params = Promise<{ versid: string }>;

export default async function Model({ params }: { params: Params }) {
  const versid = (await params).versid;
  const pakets = await getPaket({ versid: versid });
  const verAd = pakets[0]?.vers.name || "null";
  const kasaid = await getMarkaVers({ versid: versid });
  const kasaidValue = kasaid ? kasaid.kasaid : null;
  const marka = await getMarkaDetails({ kasaid: kasaidValue });
  return (
    <>
      <div className="relative">
        {/* Hero Section */}
        <div
          className="mt-16 h-[350px] w-full animate-fade-down items-center justify-center bg-cover bg-center object-contain animate-delay-500 animate-normal animate-fill-both animate-once animate-ease-in"
          style={{ backgroundImage: "url('/mainpage.png')" }}
        >
          <div className="grid grid-cols-2">
            <div className="col-span-1 mx-auto animate-fade-right px-5 animate-delay-1000 animate-normal animate-fill-both animate-once animate-ease-in">
              <br />
              <br />
              <p className="text-4xl tracking-widest text-black lg:text-5xl">
                {marka.marka?.name}
              </p>
              <br />
              <p className="text-4xl tracking-widest text-black lg:text-5xl">
                {marka.modelAd}
              </p>
            </div>
            <div className="col-span-1 mx-auto h-[100px] w-[100px] animate-fade-left animate-delay-1000 animate-normal animate-fill-both animate-once animate-ease-in lg:h-[200px] lg:w-[200px]">
              <br />
              <br />
              <Image
                height={1000}
                width={1000}
                alt="Card background"
                className="z-0 h-full w-full object-contain"
                src={marka.marka?.image || "/logooo.png"}
                quality={100}
              />
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div className="relative z-0">
          <div className="mx-auto mt-10 grid grid-cols-12 gap-10 px-5 lg:px-32">
            <p className="col-span-12 mt-5 text-center text-4xl tracking-widest text-black md:col-span-6 lg:mt-20 lg:text-5xl">
              {marka.marka?.name} {marka.kasalar?.name} {verAd}
            </p>
            <div className="col-span-12 h-full px-6 md:col-span-6 lg:px-1">
              <div>
                <Image
                  height={2000}
                  width={2000}
                  alt="Card background"
                  className="z-0 h-full w-full rounded-3xl object-contain shadow-2xl"
                  src={marka.kasalar?.image || "/img/bmw.png"}
                  quality={100}
                />
              </div>
            </div>

            {pakets.map((item, index) => (
              <div
                className="col-span-12 px-6 lg:col-span-4 lg:px-1"
                key={index}
              >
                <Card className="h-full w-full bg-black/40" shadow="lg">
                  <CardHeader className="top-1 z-10 flex-col !items-start text-2xl text-white">
                    {item.name}
                  </CardHeader>
                  {item.paketicerik.length > 0 ? (
                    <ul className="gap-4 px-10 text-xl text-white/90">
                      {item.paketicerik.map((icrk, index) => {
                        return (
                          <li className="flex gap-2" key={index}>
                            <IconArrowBadgeRight />
                            {icrk.icerik}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-white">İçerik bulunamadı</p>
                  )}
                </Card>
              </div>
            ))}
          </div>
        </div>
        <br></br>
        <br />
      </div>
      <br />
    </>
  );
}
