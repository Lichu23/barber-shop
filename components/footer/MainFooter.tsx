import { Scissors, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer id="contacto" className="bg-white text-gray-800 py-16 border-t border-pink-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Scissors className="h-8 w-8 text-pink-500" />
              <h3 className="text-2xl font-bold text-black">Chiky Peluquería</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Más de 15 años especializados en belleza femenina, ofreciendo los mejores servicios de peluquería con
              técnicas innovadoras y productos de lujo.
            </p>
            <div className="flex space-x-4">
              <Instagram className="h-6 w-6 text-gray-500 hover:text-pink-500 cursor-pointer transition-colors" />
              <Facebook className="h-6 w-6 text-gray-500 hover:text-pink-500 cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 text-gray-500 hover:text-pink-500 cursor-pointer transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 text-black">Servicios</h4>
            <ul className="space-y-2 text-gray-600">
              <li className="hover:text-pink-500 cursor-pointer transition-colors">Coloración y Balayage</li>
              <li className="hover:text-pink-500 cursor-pointer transition-colors">Cortes y Estilismo</li>
              <li className="hover:text-pink-500 cursor-pointer transition-colors">Extensiones y Volumen</li>
              <li className="hover:text-pink-500 cursor-pointer transition-colors">Tratamientos Capilares</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 text-black">Horarios</h4>
            <div className="space-y-2 text-gray-600">
              <div>
                <p className="font-medium text-gray-700">Lun - Sáb</p>
                <p>9:00 AM - 8:00 PM</p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Domingos</p>
                <p>Cerrado</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 text-black">Contacto</h4>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-pink-500" />
                <span>Carrer d'Elkano, 82 Bjs, Barcelona</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-pink-500" />
                <span>691 872 269</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-pink-500" />
                <span>info@chikypeluqueria.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-pink-100 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; 2024 Chiky Peluquería. Todos los derechos reservados.</p>
        </div>
      </div>

      <div className="border-t border-pink-100 mt-12 pt-8 text-center text-gray-500">
          <div className="flex justify-center items-center space-x-6 mb-4">
            {/* Asegúrate de que estas rutas coincidan con las páginas que has creado */}
            <a href="/privacy-policy" className="text-sm hover:text-pink-500 transition-colors">
              Política de Privacidad
            </a>
            <a href="/terms-of-service" className="text-sm hover:text-pink-500 transition-colors">
              Términos de Servicio
            </a>
          </div>
          <p className="text-xs">&copy; 2024 Chiky Peluquería. Todos los derechos reservados.</p>
        </div>
    </footer>
  )
}
