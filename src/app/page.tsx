/* eslint-disable react/jsx-no-undef */
import Image from "next/image";

import { Card, CardFooter, Link } from "@nextui-org/react";

import getMarka from "./actions/getmarka";

export default async function Home() {
  const markas = await getMarka({ search: null });
  return (
    <>
      <div className="relative">
        {/* Hero Section */}
        <div
          className="mt-16 h-[300px] w-full animate-fade-down items-center justify-center bg-cover bg-center object-contain animate-delay-1000 animate-normal animate-fill-both animate-once animate-ease-in"
          style={{ backgroundImage: "url('/mainpage.png')" }}
        >
          <div className="mx-auto text-center">
            <br />
            <br />
            <p className="text-3xl tracking-widest text-black md:text-5xl">
              ARABALARA DAİR HER ŞEY İÇİN <br /> TEK REHBERİNİZ
            </p>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div className="relative z-0">
          <div
            className="mx-auto mt-10 grid grid-cols-3 gap-8 md:grid-cols-12 lg:px-32"
            key={markas[0].id}
          >
            <p className="col-span-3 text-center text-5xl tracking-wider text-slate-600 md:col-span-12">
              Hemen Başlayabilirsiniz <br />
              <br />
            </p>
            {markas.map((item, index) => (
              // eslint-disable-next-line react/jsx-key
              <div
                className="col-span-1 mx-auto md:col-span-3 xl:col-span-2"
                key={item.id}
              >
                <Link href={`/model/${item.id}`} key={index}>
                  <Card
                    isFooterBlurred
                    className="h-[150px] w-[100px] bg-black/30 md:w-[130px] lg:w-[160px] xl:h-[200px] xl:w-[180px]"
                    shadow="lg"
                  >
                    <Image
                      height={200}
                      width={200}
                      alt="Card background"
                      className="z-0 h-5/6 w-full object-contain"
                      src={item.image}
                      quality={100}
                    />
                    <CardFooter className="absolute bottom-0 justify-between bg-black/10 text-center">
                      <b className="text-medium text-gray-200 md:text-large">
                        {item.name}
                      </b>
                    </CardFooter>
                  </Card>
                </Link>
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
