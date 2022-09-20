using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EducationalGames.Src.Models
{
    public class Rank
    {
        [Key, ForeignKey("game")]
        public int rankID { get; set; }
        public int? gameID { get; set; }
        public virtual Game game { get; set; }
        public virtual ICollection<RankItem> rankItems { get; set; }
    }
}