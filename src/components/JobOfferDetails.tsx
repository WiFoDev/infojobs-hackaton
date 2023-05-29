import Image from "next/image";
import Link from "next/link";

import {getJobOfferDeatilById} from "@/app/services/getJobOffers";

interface JobOfferDetailsProps {
  id: string;
  prevTeleworking?: string;
}

export default async function getJobOfferDetails({
  id,
  prevTeleworking,
}: JobOfferDetailsProps) {
  const {
    companyName,
    logoUrl,
    title,
    location,
    workType,
    salaryDescription,
    contractType,
  } = await getJobOfferDeatilById(id, prevTeleworking);

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg bg-white p-6">
      <div className="flex items-center gap-4">
        <div className="relative h-24 w-24 border-[1px] border-gray-200">
          <Image
            fill
            alt={`${companyName} logo`}
            sizes="100"
            src={logoUrl}
          />
        </div>
        <div className="flex flex-col">
          <h1 className="line-clamp-1 text-3xl font-medium leading-6 text-black">
            {title}
          </h1>
          <h2 className="text-lg font-light text-primary">
            {companyName}
          </h2>
        </div>
      </div>
      <div className="flex items-center justify-between gap-6">
        <ul className="flex basis-[58%] list-inside list-disc justify-between text-sm">
          <div>
            <li>{location}</li>
            <li>{workType}</li>
          </div>
          <div>
            <li>{salaryDescription}</li>
            <li>{contractType}</li>
          </div>
        </ul>
        <Link
          className="rounded-lg bg-primary px-6 py-3 font-medium uppercase text-white"
          href={`/offer/${id}/test`}
        >
          Tomar la prueba
        </Link>
      </div>
    </div>
  );
}
