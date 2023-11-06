import Link from "next/Link"
import Layout from "../Components/Layout/Layout"

import './global.css'

export const metadata = {
  title: 'NOC Claro',
  description: 'Pagina del NOC desarrollado por Eduardo Espinoza',
}

export default function RootLayout({ children }) {
 return (
    <html lang="es">
      <body>        
        <Layout>
          {children}
        </Layout>
        
      </body>
    </html>
  )
}
