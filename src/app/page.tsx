import {JobOfferCard} from "@/components";

import {getJobOffers} from "./services/getJobOffers";

export default async function Home() {
  const data = await Promise.all(await getJobOffers());

  return (
    <section className="relative mx-auto mt-4 max-w-6xl">
      <ul className="flex flex-col gap-3">
        {data.map((offer) => {
          return <JobOfferCard key={offer.id} {...offer} />;
        })}
      </ul>
    </section>
  );
}
