using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EducationalGames.Src.Models;

namespace EducationalGames.Src.Crud
{
    public class GameCrud : IDisposable
    {
        EducationalGamesContext db = new EducationalGamesContext();

        public IQueryable<Game> GetGames()
        {
            return db.Games;
        }

        public void AddRanksToGame()
        {
            List<Game> games = new List<Game>(GetGames());
            games.ForEach(g => {
                Rank rank = new Rank();
                rank.gameID = g.gameID;
                rank.rankID = g.gameID;
                db.Ranks.Add(rank);
           
                g.rank = rank;
                db.Entry(g).State = System.Data.Entity.EntityState.Modified;
            });
            db.SaveChanges();
        }


        public void Dispose()
        {
            if (db != null)
            {
                db.Dispose();
                db = null;
            }
        }
    }
}