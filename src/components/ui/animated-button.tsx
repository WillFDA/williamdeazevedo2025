import { motion } from "motion/react";

const transition = {
  type: "spring",
  stiffness: 450,
  damping: 40,
} as const;

const firstRowVariants = {
  active: {
    y: "-115%",
  },
  inactive: {
    y: "0%",
  },
};

const secondRowVariants = {
  active: {
    y: "0%",
  },
  inactive: {
    y: "115%",
  },
};

const AnimatedButton = ({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) => {
  const arrayText = text.split(" ");
  return (
    <motion.button
      initial="inactive"
      whileHover="active"
      className="w-full bg-zinc-700 text-zinc-100 font-light py-2 px-4 rounded-md shadow inset-shadow-2xs inset-shadow-zinc-100/30 hover:bg-zinc-800 transition-all duration-150 text-shadow-2xs ease hover:shadow-xl"
    >
      <div className="mx-auto grid w-fit overflow-clip">
        <div className="col-start-1 row-start-1 flex items-center justify-center gap-4">
          <div className="flex gap-1">
            {arrayText.map((word, wordIndex) => {
              return (
                <div key={wordIndex + word}>
                  {word.split("").map((char, charIndex) => {
                    const wordsBeforeChar = arrayText
                      .slice(0, wordIndex)
                      .map((w) => w.length)
                      .reduce((a, b) => a + b, 0);
                    return (
                      <motion.span
                        className="inline-block"
                        variants={firstRowVariants}
                        transition={{
                          ...transition,
                          delay: (wordsBeforeChar + charIndex) * 0.02,
                        }}
                        key={charIndex}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <motion.div
            transition={{
              ...transition,
              delay: (text.length + 1) * 0.02,
            }}
            variants={firstRowVariants}
          >
            {children}
          </motion.div>
        </div>
        <div className="col-start-1 row-start-1 flex items-center justify-center gap-4">
          <div className="flex gap-1">
            {text.split(" ").map((word, wordIndex) => (
              <div key={wordIndex + word}>
                {word.split("").map((char, charIndex) => {
                  const wordsBeforeChar = arrayText
                    .slice(0, wordIndex)
                    .map((w) => w.length)
                    .reduce((a, b) => a + b, 0);
                  return (
                    <motion.span
                      className="inline-block"
                      variants={secondRowVariants}
                      transition={{
                        ...transition,
                        delay: (wordsBeforeChar + charIndex) * 0.02,
                      }}
                      key={charIndex}
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </div>
            ))}
          </div>
          <motion.div
            transition={{
              ...transition,
              delay: (text.length + 1) * 0.02,
            }}
            variants={secondRowVariants}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </motion.button>
  );
};

export default AnimatedButton;
