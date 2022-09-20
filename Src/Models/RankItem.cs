using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EducationalGames.Src.Models
{
    public class RankItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int rankItemID { get; set; }
        public int rankID { get; set; }
        public virtual Rank rank { get; set; }
        public int position { get; set; }
        public string playerName { get; set; }
        public int points { get; set; }
    }
}