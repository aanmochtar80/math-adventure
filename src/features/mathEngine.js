/**
 * Math Engine for Math Adventure
 * Generates dynamic math questions based on level and category.
 */

export const CATEGORIES = {
  ADD_SUB: 'Penjumlahan & Pengurangan',
  MUL_DIV: 'Perkalian & Pembagian',
  FRACTIONS: 'Pecahan',
  DECIMALS: 'Desimal',
  PERCENTAGES: 'Persentase',
  WORD_PROBLEMS: 'Soal Cerita'
};

export const generateQuestion = (level) => {
  const categories = getCategoriesForLevel(level);
  const category = categories[Math.floor(Math.random() * categories.length)];
  
  switch (category) {
    case CATEGORIES.ADD_SUB:
      return generateAddSub(level);
    case CATEGORIES.MUL_DIV:
      return generateMulDiv(level);
    case CATEGORIES.FRACTIONS:
      return generateFractions(level);
    case CATEGORIES.DECIMALS:
      return generateDecimals(level);
    case CATEGORIES.PERCENTAGES:
      return generatePercentages(level);
    case CATEGORIES.WORD_PROBLEMS:
      return generateWordProblem(level);
    default:
      return generateAddSub(level);
  }
};

const getCategoriesForLevel = (level) => {
  if (level <= 5) return [CATEGORIES.ADD_SUB];
  if (level <= 10) return [CATEGORIES.ADD_SUB, CATEGORIES.MUL_DIV];
  if (level <= 15) return [CATEGORIES.ADD_SUB, CATEGORIES.MUL_DIV, CATEGORIES.FRACTIONS, CATEGORIES.DECIMALS];
  if (level <= 20) return [CATEGORIES.ADD_SUB, CATEGORIES.MUL_DIV, CATEGORIES.FRACTIONS, CATEGORIES.DECIMALS, CATEGORIES.PERCENTAGES];
  return Object.values(CATEGORIES);
};

const generateAddSub = (level) => {
  const max = 10 * level;
  const a = Math.floor(Math.random() * max) + 1;
  const b = Math.floor(Math.random() * max) + 1;
  const isAdd = Math.random() > 0.5;
  
  if (isAdd) {
    return {
      type: 'multiple-choice',
      category: CATEGORIES.ADD_SUB,
      question: `${a} + ${b} = ?`,
      options: generateOptions(a + b),
      answer: (a + b).toString()
    };
  } else {
    const big = Math.max(a, b);
    const small = Math.min(a, b);
    return {
      type: 'fill-blank',
      category: CATEGORIES.ADD_SUB,
      question: `${big} - ${small} = ?`,
      answer: (big - small).toString()
    };
  }
};

const generateMulDiv = (level) => {
  const max = level;
  const a = Math.floor(Math.random() * max) + 2;
  const b = Math.floor(Math.random() * 10) + 2;
  const isMul = Math.random() > 0.5;

  if (isMul) {
    return {
      type: 'multiple-choice',
      category: CATEGORIES.MUL_DIV,
      question: `${a} x ${b} = ?`,
      options: generateOptions(a * b),
      answer: (a * b).toString()
    };
  } else {
    const product = a * b;
    return {
      type: 'fill-blank',
      category: CATEGORIES.MUL_DIV,
      question: `${product} : ${a} = ?`,
      answer: b.toString()
    };
  }
};

const generateFractions = (level) => {
  const denom = Math.floor(Math.random() * 5) + 2;
  const num1 = Math.floor(Math.random() * (denom - 1)) + 1;
  const num2 = Math.floor(Math.random() * (denom - 1)) + 1;
  
  return {
    type: 'multiple-choice',
    category: CATEGORIES.FRACTIONS,
    question: `${num1}/${denom} + ${num2}/${denom} = ?`,
    options: [
      `${num1 + num2}/${denom}`,
      `${num1 + num2}/${denom * 2}`,
      `${Math.abs(num1 - num2)}/${denom}`,
      `${num1 * num2}/${denom}`
    ].sort(() => Math.random() - 0.5),
    answer: `${num1 + num2}/${denom}`
  };
};

const generateDecimals = (level) => {
  const a = (Math.random() * 10).toFixed(1);
  const b = (Math.random() * 10).toFixed(1);
  const ans = (parseFloat(a) + parseFloat(b)).toFixed(1);
  
  return {
    type: 'fill-blank',
    category: CATEGORIES.DECIMALS,
    question: `${a} + ${b} = ?`,
    answer: ans
  };
};

const generatePercentages = (level) => {
  const percentages = [10, 20, 25, 50, 75];
  const p = percentages[Math.floor(Math.random() * percentages.length)];
  const val = (Math.floor(Math.random() * 10) + 1) * 20;
  const ans = (p / 100) * val;
  
  return {
    type: 'multiple-choice',
    category: CATEGORIES.PERCENTAGES,
    question: `${p}% dari ${val} adalah ?`,
    options: generateOptions(ans),
    answer: ans.toString()
  };
};

const generateWordProblem = (level) => {
  const names = ['Budi', 'Siti', 'Andi', 'Lani'];
  const items = ['apel', 'buku', 'permen', 'pensil'];
  const name = names[Math.floor(Math.random() * names.length)];
  const item = items[Math.floor(Math.random() * items.length)];
  const a = Math.floor(Math.random() * 20) + 10;
  const b = Math.floor(Math.random() * 10) + 5;
  
  return {
    type: 'multiple-choice',
    category: CATEGORIES.WORD_PROBLEMS,
    question: `${name} memiliki ${a} ${item}. Kemudian ia memberikan ${b} ${item} kepada temannya. Berapa sisa ${item} ${name}?`,
    options: generateOptions(a - b),
    answer: (a - b).toString()
  };
};

const generateOptions = (correctAnswer) => {
  const options = [correctAnswer.toString()];
  while (options.length < 4) {
    const offset = Math.floor(Math.random() * 10) - 5;
    const opt = (correctAnswer + offset).toString();
    if (offset !== 0 && !options.includes(opt) && parseInt(opt) >= 0) {
      options.push(opt);
    }
  }
  return options.sort(() => Math.random() - 0.5);
};
