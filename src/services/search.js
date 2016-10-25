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
  return new Promise(function(resolve, reject) {
    if(term === '') {
      resolve([]);
      return
    }

    const results = DATABASE.filter((name) =>
      name.toLowerCase().startsWith(term.toLowerCase())
    );

    setTimeout(function() {
      resolve(results);
    }, 1000);
  });
}