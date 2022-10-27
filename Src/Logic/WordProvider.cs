using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Configuration;
using EducationalGames.Src.Crud;
using EducationalGames.Src.Models;
using MySql.Data.MySqlClient;

namespace EducationalGames.Src.Logic
{
    public class WordProvider
    {

        public WordProvider(){}
        
        public string GetSyllableSeparationGameWords(bool advanceDificulty)
        {
            string advancedDificultyQuery = advanceDificulty
                ? "AND DIPTONGO IS TRUE OR HIATO IS TRUE "
                : "";

            string sqlQuery = "SELECT PALABRA, SILABAS "
                + "FROM palabras.palabras "
                + "WHERE NUM_SILABAS >= 3 AND NUM_SILABAS <= 5 "
                + advancedDificultyQuery
                + "ORDER BY RAND()"
                + "LIMIT 10;";
            return this.formatListWordsToJson(this.ExecuteSqlQuery(sqlQuery));
        }
        
        public string GetDipthongHiatusGameWords(bool advanceDificulty)
        {
            string advancedDificultyQuery = advanceDificulty
                ? "AND (TRIPTONGO IS TRUE AND DIPTONGO IS TRUE AND HIATO IS TRUE) "
                : "AND (TRIPTONGO IS TRUE OR DIPTONGO IS TRUE OR HIATO IS TRUE) ";

            string sqlQuery = "SELECT PALABRA, SILABAS "
                + "FROM palabras.palabras "
                + "WHERE NUM_SILABAS <= 6 "
                + advancedDificultyQuery
                + "ORDER BY RAND() "
                + "LIMIT 10;";

            return this.formatListWordsToJson(this.ExecuteSqlQuery(sqlQuery));
        }

        public string GetSyllableSortGameWords(bool advanceDificulty)
        {
            string advancedDificultyQuery = advanceDificulty
                ? "WHERE NUM_SILABAS >= 5 AND NUM_SILABAS <= 6 "
                : "WHERE NUM_SILABAS >= 3 AND NUM_SILABAS <= 4 ";

            string sqlQuery = "SELECT PALABRA, SILABAS "
                + "FROM palabras.palabras "
                + advancedDificultyQuery
                + "ORDER BY RAND()"
                + "LIMIT 10;";
            return this.formatListWordsToJson(this.ExecuteSqlQuery(sqlQuery));
        }
        
        public string GetStressedSyllableGameWords(bool advanceDificulty)
        {
            string advancedDificultyQuery = advanceDificulty
                ? "WHERE DIPTONGO IS TRUE AND NUM_SILABAS >= 5 AND NUM_SILABAS <= 6 "
                : "WHERE NUM_SILABAS >= 3 AND NUM_SILABAS <= 5 ";

            string sqlQuery = "SELECT PALABRA, SILABAS "
                + "FROM palabras.palabras "
                + advancedDificultyQuery
                + "ORDER BY RAND()"
                + "LIMIT 10;";
            return this.formatListWordsToJson(this.ExecuteSqlQuery(sqlQuery));
        }

        public string GetQuestionGameWords(bool advanceDificulty)
        {
            string sqlQuery = "SELECT PALABRA, SILABAS "
                + "FROM palabras.palabras "
                + "WHERE NUM_SILABAS >= 4 "
                + "ORDER BY RAND()"
                + "LIMIT 50;";
            return this.formatListWordsToJson(this.ExecuteSqlQuery(sqlQuery));
        }
        
        public string GetSortWordGameWords(bool advanceDificulty)
        {
            string advancedDificultyQuery = advanceDificulty
                ? "WHERE NUM_SILABAS >= 3 AND NUM_SILABAS <= 5 "
                : "WHERE NUM_SILABAS >= 4 AND NUM_SILABAS <= 6 ";

            string sqlQuery = "SELECT PALABRA, SILABAS "
                + "FROM palabras.palabras "
                + advancedDificultyQuery
                + "ORDER BY RAND() "
                + "LIMIT 50;";
            return this.formatListWordsToJson(this.ExecuteSqlQuery(sqlQuery));
        }

        private List<WordsDTO> ExecuteSqlQuery(string sqlQuery)
        {
            List<WordsDTO> words = new List<WordsDTO>();
            string connstring = ConfigurationManager.ConnectionStrings["connstring"].ConnectionString;
            using (MySqlConnection conn = new MySqlConnection(connstring))
            {
                conn.Open();
                string countQuery = sqlQuery;
                using (MySqlCommand cmd = new MySqlCommand(countQuery, conn))
                {
                    MySqlDataReader rdr = cmd.ExecuteReader();
                    while (rdr.Read())
                    {
                        WordsDTO word = new WordsDTO();
                        word.completeWord = Convert.ToString(rdr[0]);
                        word.formatData(Convert.ToString(rdr[1]));
                        words.Add(word);
                    }
                    rdr.Close();
                }
                conn.Close();   
            }
            return words;
        }

        private string formatListWordsToJson(List<WordsDTO> words)
        {
            return JsonSerializer.Serialize(words);
        }
    }
}