using System;
using System.Collections.Generic;
using System.Linq;  
using EducationalGames.Src.Models;

namespace EducationalGames.Src.Crud
{
    public class RankCrud : IDisposable
    {
        EducationalGamesContext db = new EducationalGamesContext();
        public IQueryable<Rank> GetRanks()
        {
            return db.Ranks;
        }

        public Rank AddRank(Rank rank)
        {
            db.Ranks.Add(rank);
            db.SaveChanges();
            return rank;
        }

        public void AddRankItemsToRank()
        {
            List<Rank> ranks = new List<Rank>(GetRanks());
            ranks.ForEach(r => {
                List<RankItem> rankItems = getRankItems(r.rankID);
                rankItems.ForEach(rI => {
                    db.RankItems.Add(rI);
                });
            });
            db.SaveChanges();
        }

        public List<RankItem> getRankItems(int rankId)
        {
            List<RankItem> rankItems = new List<RankItem>();
            for (int i = 0; i <= 10; i++)
            {
                rankItems.Add(new RankItem
                {
                    rankID = rankId,
                    position = i,
                    playerName = "Test" + i,
                    points = 1000 / (i + 1)
                });
            }
            return rankItems;
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