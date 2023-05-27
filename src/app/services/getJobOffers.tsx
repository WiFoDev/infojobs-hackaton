const infojobsToken = process.env.INFOJOBS_TOKEN ?? "";

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
    ({salaryMin, requirementMin, teleworking}) =>
      salaryMin.value !== "0" &&
      requirementMin !== "" &&
      teleworking.value !== "",
  );

  return validOffers.map(
    ({
      id,
      title,
      requirementMin,
      author: {name},
      province: {value},
      teleworking,
    }) => ({
      id,
      title,
      requirementMin,
      companyName: name,
      place: value,
      workType: teleworking.value,
    }),
  );
}
