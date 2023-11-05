import { cn, modifyQuery, popularStores } from "@/lib/utils";
import React from "react";
import { Button } from "./ui/button";

import { queryAtom } from "@/lib/queryAtom";
import { useAtom } from "jotai";
import Image from "next/image";
import Stars from "./Stars";

type Props = {
  storeQuery: string;
};

export default function ReverseOrder({ storeQuery }: Props) {
  const [query, setQuery] = useAtom(queryAtom);
  return (
    <div className="bg-primary/10">
      <h1 className="text-4xl">Other stores</h1>
      <div className="flex h-fit py-4 gap-x-6 overflow-x-auto overflow-y-auto  px-6 border-y-2 bg-primary/10 border-white">
        {[...popularStores]
          .filter((s) => s.id !== "subway")
          .reverse()
          .filter((p) =>
            p.label.toLowerCase().includes(storeQuery.toLowerCase()),
          )
          .map((store) => (
            <Button
              onClick={() => {
                const firstType = store.dishTypes.at(0)?.value;
                if (!firstType) return;

                const currentStore = query.searchParams?.get("store");
                if (currentStore) {
                  modifyQuery(setQuery, [["type", firstType]]);
                  return;
                }

                modifyQuery(setQuery, [
                  ["store", store.id],
                  ["type", firstType],
                ]);
              }}
              className={cn([
                " flex hover:bg-secondary text-primary p-0 flex-col justify-around items-stretch gap-x-2 h-fit min-w-[16rem] border bg-white",
                query.searchParams?.get("store") === store.id
                  ? "hover:bg-secondary shadow-sm scale-[1.03] transition shadow-primary"
                  : "",
              ])}
            >
              <div className="flex h-3/4 w-full">
                <div className="w-full h-full">
                  <Image
                    alt="Dish image"
                    className="rounded-lg object-cover w-full h-32"
                    height="200"
                    src={store.src}
                    width="200"
                  />
                </div>
              </div>
              <div className="w-full justify-center h-full flex">
                <h3 className="font-semibold tracking-tight mt-2">
                  {store.label}
                </h3>
              </div>
              <div className="flex h-1/4 w-full items-center justify-around p-3">
                <Stars starFill={[true, true, true, false]} />
              </div>
            </Button>
          ))}
      </div>
    </div>
  );
}
