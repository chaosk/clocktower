import nextra from 'nextra'
 
const withNextra = nextra({})
 
export default withNextra({
  async redirects() {
    const discordUrl = process.env.DISCORD_URL
    if (!discordUrl) return []
    return [
      {
        source: '/join-the-cult',
        destination: discordUrl,
        permanent: false,
      },
    ]
  },
})
