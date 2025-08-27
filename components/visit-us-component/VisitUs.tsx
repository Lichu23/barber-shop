import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import { TikTokIcon } from "./TikTokIcon";

interface Props {
  contactEmailForUsers: string;
  contactAddress: string;
  contactPhone: string;
  mapsUbication: string | undefined;
  instagram: string | undefined;
  tiktok: string | undefined;
}
export default function VisitUs({
  contactEmailForUsers,
  contactAddress,
  contactPhone,
  mapsUbication,
  instagram,
  tiktok,
}: Props) {
  return (
    <div className="h-dvh lg:h-full w-full px-4 mb-10 lg:mb-20">
      <div className="flex flex-col items-center">
        <h2 className="text-center text-3xl text-primary font-bold m-10 lg:mb-10">
          Visitanos
        </h2>
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="bg-white rounded-xl p-5 w-full lg:max-w-xl">
            <div className="flex flex-col gap-5  lg:pl-5 lg:mt-5     justify-self-center text-base">
              <h3 className="text-xl text-primary font-bold">
                Te esperamos 😊!
              </h3>
              {contactPhone ? (
                <p className="flex gap-2">
                  <Phone /> <span>{contactPhone} </span>
                </p>
              ) : (
                ""
              )}
              {contactEmailForUsers ? (
                <p className="flex gap-2">
                  <Mail /> <span>{contactEmailForUsers}</span>
                </p>
              ) : (
                ""
              )}
              {contactAddress ? (
                <p className="flex gap-2">
                  <MapPin /> <span>{contactAddress}</span>
                </p>
              ) : (
                ""
              )}
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  className="flex items-center"
                  rel="noopener noreferrer"
                >
                  <Instagram size={20} />
                  <span className="ml-2">
                    @
                    {instagram
                      .replace(/^https?:\/\/(www\.)?instagram\.com\//, "")
                      .replace(/\/$/, "")}
                  </span>
                </a>
              )}
              {tiktok && (
                <a
                  href={tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <TikTokIcon />
                  <span>
                    {tiktok
                      .replace(/^https?:\/\/(www\.)?tiktok\.com\//, "")
                      .replace(/\/$/, "")}
                  </span>
                </a>
              )}
            </div>
          </div>
          <iframe
            src={mapsUbication}
            className="lg:w-full h-96  border-0 rounded-lg"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
