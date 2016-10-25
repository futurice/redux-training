const DATABASE = [
  'Pamela',
  'Marcus',
  'Krystina',
  'Mirella',
  'Samantha',
  'Nena',
  'Siu',
  'Elden',
  'Ashely',
  'Mabel',
  'Librada',
  'Hulda',
  'Aliza',
  'Shelley',
  'Leroy',
  'Heriberto',
  'Danita',
  'Jesica',
  'India',
  'Wen'
];


export function searchWithTerm(term) {
  if(term === '') {
    return [];
  }

  return DATABASE.filter((name) =>
    name.toLowerCase().startsWith(term.toLowerCase())
  );
}