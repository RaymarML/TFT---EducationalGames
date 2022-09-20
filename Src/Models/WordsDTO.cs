using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EducationalGames.Src.Models
{
    public class WordsDTO
    {
        public string completeWord { get; set; }

        public string syllables { get; set; }

        public int stressedSyllable { get; set; }

        public void formatData(string syllables)
        {
            string[] syllablesArray = syllables.Split('-');
            int count = 0;
            foreach (string syllable in syllablesArray)
            {
                if (syllable.Contains("<b>"))
                {
                    this.stressedSyllable = (syllablesArray.Length - 1) - count;
                    syllablesArray[count] = syllable.Replace("<b>", "").Replace("</b>", "");
                }
                count++;
            }
            this.syllables = string.Join("-", syllablesArray);
        }
    }
}