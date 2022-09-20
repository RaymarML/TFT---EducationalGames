using System;
using System.Linq;
using System.Web.UI;
using EducationalGames.Src.Models;
using EducationalGames.Src.Crud;
using EducationalGames.Src.Logic;

namespace EducationalGames.MasterPages
{
    public partial class Game : System.Web.UI.MasterPage
    {
        int gameID;
        RankItemCrud rankItemCrud = new RankItemCrud();
        WordProvider wordProvider = new WordProvider();


        protected void Page_Load(object sender, EventArgs e)
        {
            gameID = Convert.ToInt32(Request.QueryString["q"]);
        }

        public IQueryable<RankItem> GetRankItems(object sender, EventArgs e)
        {
            return rankItemCrud.GetRankItems(gameID);
        }

       protected WordProvider GetWordProvider()
       {
            return this.wordProvider;
       }

        public void LoadSyllableSeparationGame(bool advanceDificulty)
        {
            WordPlaceholder.Value = this.wordProvider.GetSyllableSeparationGameWords(advanceDificulty);
            ScriptManager.RegisterStartupScript(this.Page, Page.GetType(), "reloadWords", "gameManager.provider.reloadInformation()", true);
        }        
        
        public void LoadSyllableSortGame(bool advanceDificulty)
        {
            WordPlaceholder.Value = this.wordProvider.GetSyllableSortGameWords(advanceDificulty);
            ScriptManager.RegisterStartupScript(this.Page, Page.GetType(), "reloadWords", "gameManager.provider.reloadInformation()", true);
        }
        
        public void LoadStressedSyllableSelectorGame(bool advanceDificulty)
        {
            WordPlaceholder.Value = this.wordProvider.GetStressedSyllableGameWords(advanceDificulty);
            ScriptManager.RegisterStartupScript(this.Page, Page.GetType(), "reloadWords", "gameManager.provider.reloadInformation()", true);
        }

        public void LoadQuestionGameWords(bool advanceDificulty)
        {
            WordPlaceholder.Value = this.wordProvider.GetQuestionGameWords(advanceDificulty);
            ScriptManager.RegisterStartupScript(this.Page, Page.GetType(), "reloadWords", "gameManager.provider.reloadInformation()", true);
        }
        
        public void LoadSortGameWords(bool advanceDificulty)
        {
            WordPlaceholder.Value = this.wordProvider.GetSortWordGameWords(advanceDificulty);
            ScriptManager.RegisterStartupScript(this.Page, Page.GetType(), "reloadWords", "gameManager.provider.reloadInformation()", true);
        }
        
        public void LoadDipthongHiatusGameWords(bool advanceDificulty)
        {
            WordPlaceholder.Value = this.wordProvider.GetDipthongHiatusGameWords(advanceDificulty);
            ScriptManager.RegisterStartupScript(this.Page, Page.GetType(), "reloadWords", "gameManager.provider.reloadInformation()", true);
        }

        protected void LoadWords(object sender, EventArgs e)
        {   
        }

        protected void SaveMatch(object sender, EventArgs e)
        {
            int totalPoints = Convert.ToInt32(MatchPointsPlaceholder.Value);
            bool isInsideRank = rankItemCrud.IsInsideRank(gameID, totalPoints);

            if (isInsideRank) 
            {
                int positionInRank = rankItemCrud.GetPositionInRank(gameID, totalPoints);
                RankItemPosition.Value = positionInRank + "";
                PointsPopup.Text = totalPoints + "";
                PositionPopup.Text = positionInRank + "";
                ScriptManager.RegisterStartupScript(this.Page, Page.GetType(), "showRegisterinRankPopUp", "gameManager.showRankPopUp()", true);
            }
            else 
            {
                ScriptManager.RegisterStartupScript(this.Page, Page.GetType(), "showNotInRankPopup", "gameManager.showNotInRankPopUp()", true);
            }
        }

        protected void SavePlayer(object sender, EventArgs e)
        {
            if (PlayerName.Text == "")
            {
                EmptyNameLabel.CssClass = EmptyNameLabel.CssClass.Replace("d-none", "");
            }
            else
            {
                rankItemCrud.UpdateRankItem(
                    gameID,
                    Convert.ToInt32(RankItemPosition.Value),
                    Convert.ToInt32(MatchPointsPlaceholder.Value),
                    PlayerName.Text
                );
                Response.Redirect(Request.Url.AbsoluteUri);
            }
        }
    }
}