import Link from "next/Link"
import Layout from "../Components/Layout/Layout"

import './global.css'

export const metadata = {
  title: 'NOC Red Movil',
  description: 'Pagina del NOC desarrollado por Eduardo Espinoza',
}

export default function RootLayout({ children }) {

  

 return (
    <html lang="es">
      <body className="font-sans h-screen">    
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}
