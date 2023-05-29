import {
  getJobOfferDeatilById,
  getJobOffers,
} from "@/app/services/getJobOffers";
import {JobOfferDetails} from "@/components";

interface OfferPageParams {
  params: {
    id: string;
  };
}

export default async function OfferPage({
  params: {id},
}: OfferPageParams) {
  const {description} = await getJobOfferDeatilById(id);

  const [extraOfferDetail] = (
    await Promise.all(await getJobOffers())
  ).filter(({id: offerId}) => offerId === id);

  return (
    <section className="relative mx-auto flex max-w-5xl flex-col gap-4">
      {/* @ts-expect-error Server Component */}
      <JobOfferDetails
        id={id}
        prevTeleworking={extraOfferDetail.workType}
      />
      <div className="flex flex-col gap-3 rounded-lg bg-white px-4 py-6">
        {extraOfferDetail.requirementMin && (
          <div>
            <h3 className="text-2xl font-medium">
              Requisitos Mínimos
            </h3>
            <p>{extraOfferDetail.requirementMin}</p>
          </div>
        )}
        <div>
          <h3 className="text-2xl font-medium">Descripción</h3>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
}
