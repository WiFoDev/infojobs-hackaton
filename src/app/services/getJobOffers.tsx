const infojobsToken = process.env.INFOJOBS_TOKEN ?? "";

interface ApiOfferDetailResult extends ApiOfferResult {
  description: string;
  profile: {
    name: string;
    logoUrl: string;
  };
}

interface ApiOfferResult {
  id: string;
  title: string;
  province: Category;
  city: string;
  link: string;
  category: Category;
  contractType: Category;
  subcategory: Category;
  salaryMin: Category;
  salaryMax: Category;
  salaryPeriod: Category;
  experienceMin: Category;
  workDay: Category;
  study: Category;
  teleworking: Category;
  published: Date;
  updated: Date;
  author: Author;
  requirementMin: string;
  bold: boolean;
  applications: string;
  subSegment: number;
  executive: boolean;
  salaryDescription: string;
  multiProvince: boolean;
  urgent: boolean;
  color: boolean;
}

interface Author {
  id: string;
  privateId: number;
  name: string;
  uri: string;
  logoUrl: string;
  corporateResponsive: boolean;
  showCorporativeHeader: boolean;
}

interface Category {
  id: number;
  value: string;
}

export async function getJobOfferDeatilById(
  offerId: string,
  prevRequirements?: string,
  prevTeleworking?: string,
) {
  const response = await fetch(
    `https://api.infojobs.net/api/7/offer/${offerId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${infojobsToken}`,
      },
    },
  );

  const {
    id,
    title,
    requirementMin,
    profile: {name, logoUrl},
    province: {value},
    description,
    salaryDescription,
    contractType,
  }: ApiOfferDetailResult = await response.json();

  return {
    id,
    title,
    requirementMin: prevRequirements ?? requirementMin,
    companyName: name,
    logoUrl,
    location: value,
    workType: prevTeleworking ?? "No definido",
    description,
    salaryDescription,
    contractType: contractType.value,
  };
}

export async function getJobOffers() {
  const response = await fetch(
    "https://api.infojobs.net/api/9/offer?category=informatica-telecomunicaciones",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${infojobsToken}`,
      },
    },
  );
  const {items}: {items: Array<ApiOfferResult>} =
    await response.json();

  const validOffers = items.filter(
    ({requirementMin, teleworking}) =>
      requirementMin !== "" &&
      teleworking &&
      teleworking.value !== "",
  );

  return validOffers.map(({id, requirementMin, teleworking}) =>
    getJobOfferDeatilById(id, requirementMin, teleworking.value),
  );
}
