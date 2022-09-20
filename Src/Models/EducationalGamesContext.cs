using System.Data.Entity;

namespace EducationalGames.Src.Models
{
    public class EducationalGamesContext : DbContext
    {
        public EducationalGamesContext() : base("educationalgames")
        {
            Database.SetInitializer<EducationalGamesContext>(new GameInitializer());
        }

        public DbSet<Game> Games { get; set; }
        public DbSet<Rank> Ranks { get; set; }
        public DbSet<RankItem> RankItems { get; set; }
        public DbSet<TestWord> TestWords { get; set; }

    }
}