import nextra from 'nextra'
 
const withNextra = nextra({})
 
export default withNextra({
  async redirects() {
    return [
      {
        source: '/join-the-cult',
        destination: process.env.DISCORD_URL,
        permanent: false,
      },
    ];
  },
});
