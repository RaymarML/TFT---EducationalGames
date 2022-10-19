using System.Collections.Generic;
using System.Data.Entity;
using System;

namespace EducationalGames.Src.Models
{
    public class GameInitializer : DropCreateDatabaseIfModelChanges<EducationalGamesContext>
    {
        protected override void Seed(EducationalGamesContext context)
        {
            GetRank().ForEach(c => context.Ranks.Add(c));
            GetGames().ForEach(c => context.Games.Add(c));
        }

        private static List<Game> GetGames()
        {
            return new List<Game>
            {
                new Game
                {
                    name = "Divílabas",
                    url = "/Views/Divilabas.aspx",
                },                
                new Game
                {
                    name = "Dhiatongos",
                    url = "/Views/DiptongosHiatos.aspx",
                },                
                new Game
                {
                    name = "Silátonas",
                    url = "/Views/SilabaTonica.aspx",
                },                
                new Game
                {
                    name = "Preguntas",
                    url = "/Views/Preguntas.aspx",
                },                
                new Game
                {
                    name = "Ordenalfa",
                    url = "/Views/Ordenalas.aspx",
                },
                new Game
                {
                    name = "Silagrama",
                    url = "/Views/Silagrama.aspx",
                },
            };
        }

        private static List<Rank> GetRank()
        {
            return new List<Rank>
            {
                new Rank
                {
                    rankID = 1,
                    gameID = 1
                },                
                new Rank
                {
                    rankID = 2,
                    gameID = 2
                },                
                new Rank
                {
                    rankID = 3,
                    gameID = 3
                },                
                new Rank
                {
                    rankID = 4,
                    gameID = 4
                },                
                new Rank
                {
                    rankID = 5,
                    gameID = 5
                },
                new Rank
                {
                    rankID = 6,
                    gameID = 6
                }
            };
        }
    }
}