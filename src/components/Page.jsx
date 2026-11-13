import { projects } from '../assets/data';
import { useScroll } from 'framer-motion';
import { useRef, useState, useEffect, lazy, Suspense } from 'react';
import { baseURl } from '../../baseURL';

// Lazy load the Card component
const Card = lazy(() => import('./CardItem'));

export default function ScrollT() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 0.4', 'end end'],
  });

  const [portfolio, setPortfolio] = useState(projects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const FetchPortfolios = async () => {
      try {
        const res = await fetch(`${baseURl}/portfolio`);
        const data = await res.json();

        const formattedData = data.map((item) => {
          // 1. Check direct imagePath first
          let imageSrc = item.imagePath;

          // 2. Fall back to base64 or raw dp if imagePath doesn't exist
          if (!imageSrc && item.dp) {
            imageSrc = item.dp.startsWith('data:')
              ? item.dp
              : `data:image/gif;base64,${item.dp}`;
          }

          return {
            title: item.projectName,
            description: item.projectDescription,
            url: item.projectUrl,
            // 3. Fall back to tempDp if neither exists
            src: imageSrc || item.tempDp,
          };
        });

        setPortfolio(formattedData);
      } catch (err) {
        console.error('Failed to fetch portfolios:', err);
      } finally {
        setLoading(false);
      }
    };

    FetchPortfolios();
  }, []);

  return (
    <main
      ref={container}
      className="h-auto sm:mt-4 md:mt-5 bg-white relative w-full"
    >
      <div className="flex flex-col items-center">
        <Suspense fallback={<div className="text-center py-10">Loading projects...</div>}>
          {portfolio.map((project, i) => {
            const targetScale = 1 - (portfolio.length - i) * 0.05;
            const start = i * 0.06;
            const end = start + 0.6;

            return (
              <Card
                key={`p_${i}`}
                i={i}
                {...project}
                progress={scrollYProgress}
                range={[start, end]}
                targetScale={targetScale}
                isLast={i === portfolio.length - 1}
              />
            );
          })}
        </Suspense>
      </div>
    </main>
  );
}