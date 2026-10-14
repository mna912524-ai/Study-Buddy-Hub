export type StudyQuestion = {
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};

export type StudyTopic = {
  id: string;
  title: string;
  aliases: string[];
  overview: string;
  keyPoints: string[];
  example: string;
  importantQuestions: string[];
  quiz: StudyQuestion[];
};

export type StudySubject = {
  id: string;
  name: string;
  topics: StudyTopic[];
};

export const studySubjects: StudySubject[] = [
  {
    id: "physics",
    name: "Physics",
    topics: [
      {
        id: "electric-charges",
        title: "Electric Charges & Fields",
        aliases: ["electrostatics", "coulomb law", "electric field", "charge"],
        overview:
          "Electric charge is a basic property of matter. Charges create electric fields around them, and those fields explain how other charges experience a force.",
        keyPoints: [
          "Like charges repel; unlike charges attract.",
          "Charge is conserved and is measured in coulombs (C).",
          "Coulomb's law: F = k|q₁q₂|/r². The force gets weaker as distance increases.",
          "Electric field is force per unit positive test charge: E = F/q.",
        ],
        example:
          "If the distance between two point charges doubles, Coulomb's force becomes one-fourth as large because force varies as 1/r².",
        importantQuestions: [
          "State Coulomb's law and write its vector form.",
          "What is an electric field? Draw the field lines for an isolated positive charge.",
          "Why can two electric field lines never intersect?",
        ],
        quiz: [
          {
            prompt: "Two point charges are moved twice as far apart. What happens to the force between them?",
            options: ["It doubles", "It becomes half", "It becomes one-fourth", "It stays the same"],
            answerIndex: 2,
            explanation: "Coulomb's law has r² in the denominator. Doubling r makes the force 1/2², or one-fourth.",
          },
          {
            prompt: "The direction of the electric field at a point is the direction of force on a…",
            options: ["negative test charge", "positive test charge", "neutral particle", "magnetic pole"],
            answerIndex: 1,
            explanation: "Electric field direction is defined as the direction of force on a small positive test charge.",
          },
        ],
      },
      {
        id: "current-electricity",
        title: "Current Electricity",
        aliases: ["ohms law", "resistance", "drift velocity", "kirchhoff"],
        overview:
          "Current is the rate at which electric charge flows through a conductor. A potential difference drives the flow, while resistance makes it harder.",
        keyPoints: [
          "Current: I = Q/t, measured in amperes (A).",
          "Ohm's law: V = IR, for a conductor at constant temperature.",
          "Resistors in series add: Rₛ = R₁ + R₂ + …",
          "For parallel resistors: 1/Rₚ = 1/R₁ + 1/R₂ + …",
        ],
        example:
          "A 4 Ω resistor connected to 12 V carries I = V/R = 12/4 = 3 A.",
        importantQuestions: [
          "State Ohm's law and sketch the V–I graph for an ohmic conductor.",
          "How does equivalent resistance change when resistors are connected in series and in parallel?",
          "State Kirchhoff's junction rule and explain which conservation law it follows from.",
        ],
        quiz: [
          {
            prompt: "A 6 Ω resistor is connected across 12 V. What current flows?",
            options: ["0.5 A", "2 A", "6 A", "72 A"],
            answerIndex: 1,
            explanation: "Using Ohm's law, I = V/R = 12/6 = 2 A.",
          },
          {
            prompt: "Two resistors of 2 Ω each are connected in parallel. Their equivalent resistance is…",
            options: ["1 Ω", "2 Ω", "4 Ω", "8 Ω"],
            answerIndex: 0,
            explanation: "For two equal resistors R in parallel, the equivalent resistance is R/2, which is 1 Ω here.",
          },
        ],
      },
    ],
  },
  {
    id: "chemistry",
    name: "Chemistry",
    topics: [
      {
        id: "solutions",
        title: "Solutions",
        aliases: ["concentration", "molarity", "raoults law", "colligative properties"],
        overview:
          "A solution is a uniform mixture of a solute dissolved in a solvent. The amount of solute and the properties of the mixture help describe how a solution behaves.",
        keyPoints: [
          "Molarity (M) = moles of solute / volume of solution in litres.",
          "Molality (m) = moles of solute / mass of solvent in kilograms.",
          "Raoult's law for an ideal solution: pᵢ = xᵢpᵢ⁰.",
          "Colligative properties depend on the number of dissolved particles, not their identity.",
        ],
        example:
          "Dissolving 0.5 mol of solute to make 1.0 L of solution gives a molarity of 0.5 M.",
        importantQuestions: [
          "Differentiate between molarity and molality.",
          "State Raoult's law for a solution containing a volatile solute.",
          "Why does adding a non-volatile solute lower the vapour pressure of a solvent?",
        ],
        quiz: [
          {
            prompt: "What is the molarity of a solution containing 1 mol solute in 2 L solution?",
            options: ["0.25 M", "0.5 M", "1 M", "2 M"],
            answerIndex: 1,
            explanation: "Molarity is moles divided by solution volume: 1 ÷ 2 = 0.5 mol L⁻¹.",
          },
          {
            prompt: "Which property depends mainly on the number of solute particles?",
            options: ["Colour", "Colligative property", "Chemical name", "Molar mass of the solvent"],
            answerIndex: 1,
            explanation: "Colligative properties depend on how many particles are present, rather than what those particles are.",
          },
        ],
      },
      {
        id: "electrochemistry",
        title: "Electrochemistry",
        aliases: ["galvanic cell", "electrode potential", "nernst equation", "redox"],
        overview:
          "Electrochemistry connects chemical reactions with electricity. In a galvanic cell, a spontaneous redox reaction produces electrical energy.",
        keyPoints: [
          "Oxidation is loss of electrons; reduction is gain of electrons.",
          "Oxidation happens at the anode; reduction happens at the cathode.",
          "Electrons travel through the external wire from anode to cathode.",
          "For a galvanic cell, E°cell = E°cathode − E°anode.",
        ],
        example:
          "In a Daniell cell, zinc loses electrons at the anode and copper ions gain them at the cathode.",
        importantQuestions: [
          "Write the cell notation for a Daniell cell and identify its anode and cathode.",
          "How is standard cell potential calculated from electrode potentials?",
          "What is the role of a salt bridge in a galvanic cell?",
        ],
        quiz: [
          {
            prompt: "At which electrode does oxidation occur?",
            options: ["Anode", "Cathode", "Salt bridge", "Voltmeter"],
            answerIndex: 0,
            explanation: "Remember the rule: oxidation at the anode, reduction at the cathode.",
          },
          {
            prompt: "In a galvanic cell, electrons flow through the wire from…",
            options: ["cathode to anode", "anode to cathode", "salt bridge to cathode", "solution to anode"],
            answerIndex: 1,
            explanation: "The anode releases electrons during oxidation; they travel through the wire to the cathode.",
          },
        ],
      },
    ],
  },
  {
    id: "mathematics",
    name: "Mathematics",
    topics: [
      {
        id: "matrices",
        title: "Matrices",
        aliases: ["matrix", "determinant", "inverse matrix", "identity matrix"],
        overview:
          "A matrix is a rectangular arrangement of numbers in rows and columns. Matrix operations help organise and solve systems of linear equations.",
        keyPoints: [
          "The order of a matrix is rows × columns.",
          "Matrices can be added only when they have the same order.",
          "Matrix multiplication AB is defined when columns of A equal rows of B.",
          "For a square matrix A, an inverse exists only when det(A) ≠ 0.",
        ],
        example:
          "A 2 × 3 matrix multiplied by a 3 × 1 matrix is defined and gives a 2 × 1 matrix.",
        importantQuestions: [
          "Find the order of the product of a 3 × 2 matrix and a 2 × 4 matrix.",
          "When does a square matrix have an inverse?",
          "Show that matrix multiplication is not generally commutative.",
        ],
        quiz: [
          {
            prompt: "What is the order of the product of a 2 × 3 matrix and a 3 × 4 matrix?",
            options: ["2 × 4", "3 × 3", "4 × 2", "2 × 3"],
            answerIndex: 0,
            explanation: "The inner dimensions (3 and 3) match. The product takes the outer dimensions: 2 × 4.",
          },
          {
            prompt: "A square matrix has an inverse when its determinant is…",
            options: ["zero", "one only", "non-zero", "negative only"],
            answerIndex: 2,
            explanation: "A square matrix is invertible exactly when its determinant is non-zero.",
          },
        ],
      },
      {
        id: "derivatives",
        title: "Applications of Derivatives",
        aliases: ["derivative", "increasing decreasing", "maxima minima", "tangent"],
        overview:
          "A derivative measures how quickly a function changes. It can tell us where a curve rises or falls and help find its highest or lowest points.",
        keyPoints: [
          "The derivative f′(x) is the slope of the tangent to y = f(x).",
          "If f′(x) > 0 on an interval, f is increasing there.",
          "If f′(x) < 0 on an interval, f is decreasing there.",
          "A stationary point occurs where f′(x) = 0; use a sign test to classify it.",
        ],
        example:
          "For f(x) = x², f′(x) = 2x. The function is decreasing when x < 0 and increasing when x > 0.",
        importantQuestions: [
          "Find the intervals in which f(x) = x² − 4x is increasing or decreasing.",
          "Use the first derivative test to identify a local maximum or minimum.",
          "How does the sign of f′(x) describe the behaviour of a curve?",
        ],
        quiz: [
          {
            prompt: "If f′(x) is positive throughout an interval, f is…",
            options: ["decreasing", "increasing", "constant", "undefined"],
            answerIndex: 1,
            explanation: "A positive derivative means the graph has a positive slope and the function is increasing.",
          },
          {
            prompt: "For f(x) = x², what is f′(x)?",
            options: ["x", "2x", "x²", "2"],
            answerIndex: 1,
            explanation: "Apply the power rule: the derivative of x² is 2x.",
          },
        ],
      },
    ],
  },
  {
    id: "biology",
    name: "Biology",
    topics: [
      {
        id: "inheritance",
        title: "Principles of Inheritance",
        aliases: ["genetics", "mendel", "dominant recessive", "monohybrid cross"],
        overview:
          "Inheritance explains how traits pass from parents to offspring. Mendel used pea plants to show that traits are controlled by pairs of factors, now called alleles.",
        keyPoints: [
          "An allele is one form of a gene.",
          "A dominant allele can show its effect with one copy; a recessive trait usually needs two copies.",
          "The law of segregation says a pair of alleles separates when gametes form.",
          "A monohybrid cross of two heterozygotes gives a 3:1 dominant-to-recessive phenotype ratio.",
        ],
        example:
          "For Tt × Tt, the possible genotypes are TT, Tt, Tt, and tt. Three show the dominant trait and one shows the recessive trait.",
        importantQuestions: [
          "State the law of segregation and illustrate it with a monohybrid cross.",
          "Distinguish between genotype and phenotype.",
          "Why is a test cross useful for identifying an unknown genotype?",
        ],
        quiz: [
          {
            prompt: "In a Tt × Tt cross, what is the expected phenotype ratio if T is completely dominant?",
            options: ["1:1", "1:2:1", "3:1", "9:3:3:1"],
            answerIndex: 2,
            explanation: "Three offspring combinations show the dominant trait and one (tt) shows the recessive trait.",
          },
          {
            prompt: "The visible expression of a trait is called its…",
            options: ["genotype", "phenotype", "allele", "gamete"],
            answerIndex: 1,
            explanation: "Phenotype means the observable characteristics; genotype describes the allele combination.",
          },
        ],
      },
      {
        id: "human-reproduction",
        title: "Human Reproduction",
        aliases: ["reproduction", "fertilisation", "menstrual cycle", "embryo"],
        overview:
          "Human reproduction involves the formation of gametes, fertilisation, and the development of an embryo. Hormones coordinate many of these steps.",
        keyPoints: [
          "Sperm are formed in the testes; ova mature in the ovaries.",
          "Fertilisation usually takes place in the ampullary-isthmic region of the oviduct.",
          "The zygote divides as it travels toward the uterus.",
          "The placenta supports exchange of nutrients, gases, and wastes between mother and foetus.",
        ],
        example:
          "After fertilisation, repeated cell divisions form a blastocyst, which implants in the uterine lining.",
        importantQuestions: [
          "Describe the main events from fertilisation to implantation.",
          "State two functions of the placenta.",
          "Explain the role of the corpus luteum after ovulation.",
        ],
        quiz: [
          {
            prompt: "Where does fertilisation usually occur in humans?",
            options: ["Uterus", "Ovary", "Ampullary-isthmic region of the oviduct", "Cervix"],
            answerIndex: 2,
            explanation: "In humans, fertilisation usually occurs at the ampullary-isthmic junction of the oviduct.",
          },
          {
            prompt: "Which structure allows exchange between maternal and foetal blood?",
            options: ["Placenta", "Cervix", "Ovary", "Urethra"],
            answerIndex: 0,
            explanation: "The placenta is the exchange organ for nutrients, gases, and wastes during pregnancy.",
          },
        ],
      },
    ],
  },
  {
    id: "english",
    name: "English",
    topics: [
      {
        id: "the-last-lesson",
        title: "The Last Lesson",
        aliases: ["alphonse daudet", "franz", "m hamel", "language"],
        overview:
          "In Alphonse Daudet's story, Franz arrives late to school and learns that it is the last French lesson. The announcement makes him value his language, his teacher, and the lessons he had taken for granted.",
        keyPoints: [
          "Franz begins the story distracted and unprepared.",
          "M. Hamel explains that an order has made German the language taught in Alsace and Lorraine.",
          "The classroom's quiet attention shows a new respect for learning.",
          "The story connects language with identity, belonging, and freedom.",
        ],
        example:
          "Franz's regret about not studying earlier helps show how people may value something only when they fear losing it.",
        importantQuestions: [
          "How does Franz's attitude towards school change during the story?",
          "Why does M. Hamel call French a key to freedom?",
          "Describe the atmosphere in the classroom on the last day.",
        ],
        quiz: [
          {
            prompt: "Who narrates The Last Lesson?",
            options: ["M. Hamel", "Franz", "The blacksmith", "The mayor"],
            answerIndex: 1,
            explanation: "Franz tells the story, so readers see the last lesson through his changing feelings.",
          },
          {
            prompt: "What is one central idea of the story?",
            options: ["The value of language and learning", "The dangers of travel", "The importance of sport", "The joy of wealth"],
            answerIndex: 0,
            explanation: "The story highlights how language and education are tied to identity and freedom.",
          },
        ],
      },
      {
        id: "indigo",
        title: "Indigo",
        aliases: ["gandhi", "champaran", "rajkumar shukla", "civil disobedience"],
        overview:
          "In this chapter from Louis Fischer's account of Gandhi, the Champaran movement shows how listening to ordinary people and acting without fear can challenge injustice.",
        keyPoints: [
          "Rajkumar Shukla persistently asks Gandhi to visit Champaran.",
          "Peasants were compelled by landlords to grow indigo under the tinkathia system.",
          "Gandhi's decision to stay despite official orders became an act of civil disobedience.",
          "The movement built confidence and self-reliance among the peasants.",
        ],
        example:
          "Gandhi first gathers facts and listens to the peasants. This shows that careful understanding can be the first step toward fair action.",
        importantQuestions: [
          "Why did Rajkumar Shukla want Gandhi to visit Champaran?",
          "What was the tinkathia system?",
          "How did the Champaran episode help the peasants beyond the refund they received?",
        ],
        quiz: [
          {
            prompt: "Why did Rajkumar Shukla approach Gandhi?",
            options: ["To invite him to a school", "To seek help for Champaran's indigo farmers", "To discuss a court case in Delhi", "To arrange a railway journey"],
            answerIndex: 1,
            explanation: "Shukla wanted Gandhi to see the injustice faced by indigo sharecroppers in Champaran.",
          },
          {
            prompt: "What was a lasting result of Gandhi's work in Champaran?",
            options: ["Peasants gained courage and self-reliance", "All crops were banned", "The peasants moved away", "Schools were closed"],
            answerIndex: 0,
            explanation: "The campaign helped peasants overcome fear and showed them they could stand up for their rights.",
          },
        ],
      },
    ],
  },
  {
    id: "computer-science",
    name: "Computer Science",
    topics: [
      {
        id: "python-dataframes",
        title: "Python: DataFrames",
        aliases: ["pandas", "dataframe", "series", "python"],
        overview:
          "A pandas DataFrame is a two-dimensional table of labelled rows and columns. It is useful for organising, inspecting, and selecting data in Python.",
        keyPoints: [
          "A DataFrame has labelled rows and columns and can store different data types by column.",
          "A Series is a one-dimensional labelled sequence.",
          "Use df.head() to preview the first rows and df.shape to check rows and columns.",
          "Use df['column'] to select a column by its label.",
        ],
        example:
          "If marks is a DataFrame, marks['Name'] selects its Name column as a Series.",
        importantQuestions: [
          "Differentiate between a pandas Series and a DataFrame.",
          "What information does df.shape provide?",
          "Write a statement to select the 'Marks' column from a DataFrame named result.",
        ],
        quiz: [
          {
            prompt: "Which pandas structure is two-dimensional?",
            options: ["Series", "DataFrame", "Tuple", "String"],
            answerIndex: 1,
            explanation: "A DataFrame is a two-dimensional labelled table; a Series is one-dimensional.",
          },
          {
            prompt: "What does df.shape return?",
            options: ["Only column names", "A tuple of row and column counts", "The first row", "The data types only"],
            answerIndex: 1,
            explanation: "The shape attribute returns (number of rows, number of columns).",
          },
        ],
      },
      {
        id: "sql-basics",
        title: "SQL: Queries & Filtering",
        aliases: ["sql", "select", "where", "database", "mysql"],
        overview:
          "SQL lets you ask a relational database for information. A SELECT query chooses columns, FROM names a table, and WHERE filters rows.",
        keyPoints: [
          "SELECT chooses the columns to display.",
          "FROM names the table that contains the data.",
          "WHERE keeps only rows that satisfy a condition.",
          "ORDER BY sorts rows; use DESC for descending order.",
        ],
        example:
          "SELECT name, marks FROM students WHERE marks >= 80; returns the names and marks of students scoring at least 80.",
        importantQuestions: [
          "Write a query to display all columns from a table named BOOKS.",
          "What is the difference between WHERE and ORDER BY?",
          "How would you list student names in alphabetical order?",
        ],
        quiz: [
          {
            prompt: "Which SQL clause filters rows using a condition?",
            options: ["SELECT", "FROM", "WHERE", "ORDER BY"],
            answerIndex: 2,
            explanation: "WHERE applies a condition to decide which rows appear in the result.",
          },
          {
            prompt: "Which clause sorts the output rows?",
            options: ["ORDER BY", "GROUP", "FILTER", "VALUES"],
            answerIndex: 0,
            explanation: "ORDER BY sorts rows by one or more columns, ascending by default.",
          },
        ],
      },
    ],
  },
];

export function searchStudyTopics(query: string, subjectId = "all"): StudyTopic[] {
  const words = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const topics = studySubjects
    .filter((subject) => subjectId === "all" || subject.id === subjectId)
    .flatMap((subject) => subject.topics);

  if (words.length === 0) return topics;

  return topics
    .map((topic) => {
      const haystack = [
        topic.title,
        ...topic.aliases,
        topic.overview,
        ...topic.keyPoints,
        ...topic.importantQuestions,
        ...topic.quiz.map((question) => question.prompt),
      ]
        .join(" ")
        .toLocaleLowerCase();
      const score = words.reduce((total, word) => total + (haystack.includes(word) ? 1 : 0), 0);
      return { topic, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ topic }) => topic);
}
