import Head from 'next/head'

export default function Home() {
  return (
    <div className="container">

      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Welcome to <a href="https://goo.gl/maps/B7bmmCEpiTnkVLNG7">DAGZ DEV!</a>
        </h1>

        <p className="description">
          Get started by <code>knowning DAGZ</code>
        </p>

        <div className="grid">
          <a href="https://www.youtube.com/watch?v=pvJ5eqIt6MM" className="card">
            <h3>DAGZ funny pictures &rarr;</h3>
            <p>Come with me and laugh about DAGZ OMG SO LOL 🤣🤣🤣</p>
          </a>

          <a href="https://www.youtube.com/watch?v=d8sMnNKqqWE" className="card">
            <h3>DAGZ memes &rarr;</h3>
            <p>Memes so funny that get your money up 💰💰💰</p>
          </a>

          <a
            href="https://www.youtube.com/watch?v=PczJmku2cPg"
            className="card"
          >
            <h3>DAGZ in iglesia shalom &rarr;</h3>
            <p>Come and pray for Mizael Rodriguez downfall 🙏🙏🙏</p>
          </a>

          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            className="card"
          >
            <h3>DAGZ selling alexas &rarr;</h3>
            <p>
              Learn economics while breaking the current local market 🤩🤩🤩
            </p>
          </a>
        </div>
      </main>

      <footer>
        <a
          href="https://matias.ma/nsfw/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
