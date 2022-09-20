using System.Linq;
using EducationalGames.Src.Models;

namespace EducationalGames.Src.Crud
{
    public class TestWordCrud
    {
        EducationalGamesContext db = new EducationalGamesContext();
        public IQueryable<TestWord> GetWords()
        {
            return db.TestWords;
        }
    }
}