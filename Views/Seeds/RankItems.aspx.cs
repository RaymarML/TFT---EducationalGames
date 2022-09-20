using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using EducationalGames.Src.Crud;

namespace EducationalGames.Views.Seeds
{
    public partial class RankItems : System.Web.UI.Page
    {
        RankCrud rankCrud;

        protected void Page_Load(object sender, EventArgs e)
        {
            rankCrud = new RankCrud();
            rankCrud.AddRankItemsToRank();
        }
    }
}