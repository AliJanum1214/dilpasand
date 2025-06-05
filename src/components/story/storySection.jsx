"use client";
import { motion, useScroll, useTransform } from "framer-motion";

const timeline = [
  {
    heading: "2002",
    title: "The Humble Beginning",
    text: "Asghar Khan arrived in London from Karachi, bringing with him a deep connection to the food culture he grew up with.",
    img: "./images/author.png",
  },
  {
    heading: "2010",
    title: "A Community Hub",
    text: `He began working in the food industry, gaining hands-on experience in busy London kitchens and learning what it takes to run a restaurant from the ground up.`,
    img: "./images/stories/story_2010.webp",
  },
  {
    heading: "2016",
    title: "Crossing Borders",
    text: `After years of hard work, he opened his first restaurant on Southall Broadway, focused on serving traditional Pakistani dishes to the local community.`,
    img: "./images/stories/story_2016.webp",
  },
  {
    heading: "2019",
    title: "Growth and Recognition",
    text: `Asghar launched Dilpasand in Whitechapel, with a clear goal: to bring bold, authentic Pakistani flavours to central London. Today, Dilpasand is a reflection of his journey—rooted in Karachi, built in London.`,
    img: "./images/stories/story_2019.webp",
  },
];

export default function StorySection() {
  const { scrollYProgress } = useScroll();
  const dot1Opacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 1, 1]);
  const dot2Opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6], [0, 1, 1]);
  const dot3Opacity = useTransform(scrollYProgress, [0.4, 0.6, 0.8], [0, 1, 1]);
  const dot4Opacity = useTransform(scrollYProgress, [0.6, 0.8, 1], [0, 1, 1]);

  return (
    <section className="bg-[#1A0E08] text-white py-20 px-4 md:px-12 pt-28 md:pt-36">
      <div className="max-w-5.5xl mx-auto pb-20 relative">
        {/* Vertical Line with Dots */}
        <motion.div className="absolute left-4 top-0 h-full w-[1px] bg-custom-secondary">
          {/* Dot 1 */}
          <motion.div
            className="absolute w-3 h-3 bg-custom-secondary rounded-full"
            style={{
              top: "0%",
              left: "-5.5px",
              opacity: dot1Opacity,
            }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          {/* Dot 2 */}
          <motion.div
            className="absolute w-3 h-3 bg-custom-secondary rounded-full"
            style={{
              top: "33.33%",
              left: "-5.5px",
              opacity: dot2Opacity,
            }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          {/* Dot 3 */}
          <motion.div
            className="absolute w-3 h-3 bg-custom-secondary rounded-full"
            style={{
              top: "66.66%",
              left: "-5.5px",
              opacity: dot3Opacity,
            }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          {/* Dot 4 */}
          <motion.div
            className="absolute w-3 h-3 bg-custom-secondary rounded-full"
            style={{
              top: "100%",
              left: "-5.5px",
              opacity: dot4Opacity,
            }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Timeline Items */}
        <div className="relative border-l custom-border ml-4">
          {timeline.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                className="pl-8 mb-0 mt-4 md:mt-0 md:-mb-16 relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {/* Flex container */}
                <div
                  className={`flex flex-col md:flex-row ${
                    !isEven ? "md:flex-row-reverse" : ""
                  } items-center`}
                >
                  {/* Image */}
                  <div className="w-full md:w-[40%] flex justify-center">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-72 h-[400px] object-cover max-w-xs md:max-w-sm"
                    />
                  </div>

                  {/* Text */}
                  <div
                    className={`w-full md:w-[55%] border-b pb-10 custom-border  mt-5 ${
                      !isEven ? "md:text-left pl-6" : "pl-6"
                    }`}
                  >
                    <h3 className="text-yellow-400 text-lg font-semibold mb-1">
                      {item.heading}
                    </h3>
                    <h2 className="text-2xl font-semibold mb-2">
                      {item.title}
                    </h2>
                    {item.text && <p className="text-white">{item.text}</p>}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
