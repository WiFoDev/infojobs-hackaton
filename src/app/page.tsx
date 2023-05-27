import {getJobOffers} from "./services/getJobOffers";

export default async function Home() {
  const data = await getJobOffers();

  console.log(data);

  return <section>
    <div>
      
    </div>
  </section>;
}
