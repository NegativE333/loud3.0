export const getEmptyStateMessage = (pathName: string) => {
  switch (pathName) {
    case "/favourite":
      return {
        title: "Your favorites list is empty",
        description:
          "Start adding songs you love to create your personal collection",
      };
    case "/throwbackTunes":
      return {
        title: "No throwback tunes available",
        description: "Check back later for classic hits from the past",
      };
    case "/globalhits":
      return {
        title: "No global hits available",
        description: "Check back soon for worldwide chart-toppers",
      };
    case "/partystarters":
      return {
        title: "No party tracks available",
        description: "Check back later for energetic party music",
      };
    case "/loveballads":
      return {
        title: "No love ballads available",
        description: "Check back soon for romantic melodies",
      };
    default:
      return {
        title: "No matching tracks found",
        description:
          "Try adjusting your search terms or browse our curated playlists",
      };
  }
};

export const getRandomMusicalQuote = (): string => {
    const quotes = [
      // Deep/Philosophical
      '"Music expresses that which cannot be put into words" - Victor Hugo',
      "Sangeet wo zuban hai jo bina kahe sab keh jaati hai",
      '"Where words fail, music speaks" - Hans Christian Andersen',
      "Jab alfaaz khatam ho jaate hain, tab sangeet bolne lagta hai",
      '"Music is the poetry of the air" - Jean Paul Richter',
      
      // Emotional/Romantic
      "Kuch lafzon mein nahi, kuch dhun mein keh diya",
      '"Music is the literature of the heart" - Colette',
      "Har dhadkan mein ek dhun hai, har saans mein ek geet",
      "Mohabbat ki zuban, sangeet ki kitaab",
      '"Music is love in search of a word" - Sidney Lanier',
      "Ishq ke rang mein rangeen hai yeh saaz",
      
      // Life & Music
      '"Life is one grand, sweet song" - James Russell Lowell',
      "Zindagi ke har mod pe ek gaana hai",
      "Jahan shabdon ki seema khatam hoti hai, wahan sangeet shuru hota hai",
      '"Music is the soundtrack of your life" - Dick Clark',
      "Jeene ka sahara hai, gaane ka sahara hai",
      "Zindagi ek raag hai, ise gungunana seekho",
      
      // Soul & Music
      '"Music is the soul of life" - Unknown',
      "Dil ki har dhun mein ek kahani hai",
      "Khamoshi bhi ek raag hai, sunne wala chahiye",
      '"Music is the medicine of the mind" - John Logan',
      "Rooh ki awaaz hai sangeet",
      "Sur jo chhed de mann ke taar",
      
      // Memories & Music
      "Purani yaadein aur purane gaane, dono dil ko chhu jaate hain",
      "Yaadein mitti hain, gaane nahi",
      "Har geet ek yaad hai, har dhun ek ehsaas",
      '"Music is the art of thinking with sounds" - Jules Combarieu',
      "Beete lamhon ki daastan hai har gaana",
      
      // Universal Language
      '"Music is the universal language of mankind" - Longfellow',
      "Sangeet koi seema nahi jaanta, koi bhasha nahi pehchanta",
      "Sur ki duniya mein har koi ek hai",
      '"Music is the language of the spirit" - Kahlil Gibran',
      "Ek sur mein bandha saara jahaan",
      "Sangeet ki bhasha sabki bhasha",
      
      // Modern/Contemporary
      "Rhythm mein hai zindagi ki dhun",
      '"Music is life itself" - Louis Armstrong',
      "Beat pe chalti hai duniya saari",
      '"Music is the wine that fills the cup of silence" - Robert Fripp',
      "Gaano mein hai jeene ka raaz",
      
      // Inspirational
      '"Music gives a soul to the universe" - Plato',
      "Sangeet se sawar jaati hai zindagi ki har sham",
      "Har mushkil ka hal hai gaano mein",
      '"Without music, life would be a mistake" - Friedrich Nietzsche',
      "Sur aur taal se bani hai yeh kahani",
      
      // Celebration
      "Jashn-e-zindagi hai har gaana",
      '"Life seems to go on without effort when I am filled with music" - George Eliot',
      "Khushiyon ka mehkta gulshan hai sangeet",
      "Celebration of soul is what music is",
      "Dil ka jashn, sur ka tyohaar"
    ];
  
    return quotes[Math.floor(Math.random() * quotes.length)];
  };
