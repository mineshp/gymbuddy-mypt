import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.css'
import Timer from './Timer';

// TODO: Move to config file, gets set on start of app
const config = {
  exerciseIntervals: 60000, // milliseconds
  reps: 15,
  sets: 3,
  timedInterval: true
};

export default function Exercise({exercise}) {
    const router = useRouter();
    const { id } = router.query;
    
    return (
      <div className={styles.container}>
        <Head>
          <title>{exercise.id}</title>
        </Head>
        <main className={styles.main}>
          <h1 className={styles.title}>{exercise.id}</h1>
          <h4 className={styles.description}>{exercise.description}</h4>
          <p className={styles.info}>Muscle areas: {exercise.musclesWorked}</p>
          <Image height={400} width={500} alt={exercise.description} src={exercise.imageUrl} />
          {
            config.timedInterval && <Timer />
          }
        </main>
      </div>
    );
}

export async function getStaticProps({params}) {
  const req = await fetch(`http://localhost:3000/${params.id}.json`);
  const data = await req.json();

  return {
      props: { exercise: data }
  }
}

/*
Use for Server Side Rendering: When data changes often, requires server
Note: If you use this, comment out getStaticPaths and getStaticProps functions
*/
// export async function getServerSideProps({params}) {
//   console.log(params.id);
//   const req = await fetch(`http://localhost:3000/${params.id}.json`);
//   console.log(req);
//   const data = await req.json();
//   console.log(data);

//   return {
//       props: { exercise: data }
//   }
// }

export async function getStaticPaths() {
  const req = await fetch('http://localhost:3000/exercises.json');
  const data = await req.json();

  const paths = data.map(exercise => {
    return { params: { id: exercise } }
  });

  return {
    paths,
    fallback: false
  }
}