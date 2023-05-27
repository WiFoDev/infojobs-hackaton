import Image from "next/image";
import Link from "next/link";

import company from "@/assets/company.png";

interface JobOfferCardProps {
  id: string;
  title: string;
  companyName: string;
  logoUrl: string;
  location: string;
  workType: string;
  description: string;
}

export default function JobOfferCard({
  id,
  title,
  companyName,
  location,
  workType,
  description,
  logoUrl,
}: JobOfferCardProps) {
  return (
    <li className="list-none">
      <Link
        className="flex items-start gap-4 rounded-lg bg-white p-4 transition-all hover:bg-tertiary"
        href={`/offer/${id}`}
      >
        <div className="relative h-20 w-20 overflow-hidden rounded border-[1px] border-gray-200">
          <Image
            fill
            alt="A company logo"
            sizes="100"
            src={logoUrl ?? company}
          />
        </div>
        <div className="flex max-w-[85%] flex-col gap-2">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm font-light text-primary">
              {companyName}
            </p>
          </div>
          <div className="flex gap-1.5 text-xs">
            <span>{location} </span>|<span>{workType}</span>
          </div>
          <div className="line-clamp-2 text-secondary">
            {description}
          </div>
        </div>
      </Link>
    </li>
  );
}
