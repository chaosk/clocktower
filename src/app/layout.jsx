import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
 
export const metadata = {}
 
const banner = <Banner storageKey="hooray-more-clocks">Now with 100% more clocks! 🕰️🗼</Banner>
const navbar = (
  <Navbar
    logo={<b>Blood on the Clocktower 101</b>}
  />
)
const search = (
  <Search
    placeholder="Search…"
  />
)
const footer = <Footer>Site meant to ease onboarding of new players. Not affiliated in any way with Steven Medway or The Pandemonium Institute.<br/>Script PDFs, character information and graphics © Steven Medway, bloodontheclocktower.com</Footer>
 
export default async function RootLayout({ children }) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
    >
      <Head>
        {}
      </Head>
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          search={search}
          sidebar={{autoCollapse: false}}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/chaosk/clocktower/tree/main"
          feedback={{content: null}}
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
