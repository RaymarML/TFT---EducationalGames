using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EducationalGames.Src.Models
{
    public class TestWord
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int wordID { get; set; }
        public string completeWord { get; set; }
        public string syllables { get; set; }
        public int stressedSyllable { get; set; }
    }
}