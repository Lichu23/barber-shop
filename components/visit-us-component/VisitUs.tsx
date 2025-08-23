import { Mail, MapPin, MapPinHouse, Phone } from "lucide-react";
import React from "react";
interface Props {
  contactEmailForUsers: string;
  contactAddress: string;
  contactPhone: string;
  mapsUbication: string | undefined;
}
export default function VisitUs({
  contactEmailForUsers,
  contactAddress,
  contactPhone,
  mapsUbication,
}: Props) {
  return (
    <div className="h-dvh w-full px-4">
      <div className="flex flex-col items-center">
        <h2 className="text-center text-3xl text-primary font-bold m-10">
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
