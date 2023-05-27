import Image from "next/image";
import Link from "next/link";

import {getJobOfferDeatilById} from "@/app/services/getJobOffers";
import {JobOfferDetails} from "@/components";

interface OfferPageParams {
  params: {
    id: string;
  };
}

export default async function OfferPage({
  params: {id},
}: OfferPageParams) {
  const {description, requirementMin} = await getJobOfferDeatilById(
    id,
  );

  return (
    <section className="relative mx-auto max-w-5xl">
      {/* @ts-expect-error Server Component */}
      <JobOfferDetails id={id} />
    </section>
  );
}
