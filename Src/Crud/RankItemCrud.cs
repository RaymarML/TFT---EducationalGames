using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EducationalGames.Src.Models;

namespace EducationalGames.Src.Crud
{
    public class RankItemCrud
    {
        EducationalGamesContext db = new EducationalGamesContext();
        private List<RankItem> GetRankItemsAsList(int gameID)
        {
            return new List<RankItem>(GetRankItems(gameID));
        }
        public IQueryable<RankItem> GetRankItems(int gameID)
        {
            Rank rank = db.Ranks.SingleOrDefault(r => r.gameID == gameID);
            return db.RankItems
                .Where(rI => rI.rankID == rank.rankID)
                .OrderBy(x => x.position);
        }

        public bool IsInsideRank(int gameID, int totalPoints)
        {
            List<RankItem> rankItems = GetRankItemsAsList(gameID);

            if (rankItems.Count() < 10) return true;

            foreach (RankItem rankItem in rankItems)
            {
                if (rankItem.points <= totalPoints) return true;
            }
            return false;
        }

        public int GetPositionInRank(int gameID, int totalPoints)
        {
            List<RankItem> rankItems = GetRankItemsAsList(gameID);

            if (rankItems.Count() == 0) return 1;

            foreach (RankItem rankItem in rankItems)
            {
                if (rankItem.points <= totalPoints) return rankItem.position;
            }

            if (rankItems.Count() < 10)
            {
                return rankItems.Count() + 1;
            }

            return -1;
        }

        public void UpdateRankItem(int gameID, int positionInRank, int totalPoints, string playerName)
        {
            List<RankItem> rankItems = GetRankItemsAsList(gameID);
            Rank rank = db.Ranks.SingleOrDefault(r => r.gameID == gameID);

            RankItem rankItem = new RankItem();
            rankItem.rankID = rank.rankID;
            rankItem.points = totalPoints;
            rankItem.playerName = playerName;
            rankItem.position = positionInRank;

            if (rankItems.Count() < positionInRank) 
            {
                db.RankItems.Add(rankItem);
            } 
            else 
            {
                UpdateAndShiftRankItems(rankItems, positionInRank);
                db.RankItems.Add(rankItem);
            }
            db.SaveChanges();
        }

        public void UpdateAndShiftRankItems(List<RankItem> rankItems, int positionInRank)
        {
            foreach (RankItem rankItem in rankItems)
            {
                if (rankItem.position >= positionInRank)
                {
                    rankItem.position += 1;
                    db.Entry(rankItem).State = rankItem.position > 10 
                        ? System.Data.Entity.EntityState.Deleted
                        : System.Data.Entity.EntityState.Modified;
                }
            }
        }
    }
}