import { contactInfo } from "@/constants/hero"

export default function ContactBar() {
  return (
    <div className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
          {contactInfo.map((item, index) => {
            const IconComponent = item.icon
            return (
              <div key={index} className="flex items-center justify-center md:justify-start gap-3">
                <div className={`${item.bgColor} rounded-full p-2 flex-shrink-0`}>
                  <IconComponent className="h-5 w-5 text-white" />
                </div>
                <div className="text-center md:text-left">
                  <p className="font-semibold text-lg">{item.title}</p>
                  <p className="text-sm text-gray-300">{item.subtitle}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
