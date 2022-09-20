using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using EducationalGames.Src.Crud;
using EducationalGames.Src.Models;

namespace EducationalGames.Views.Seeds
{

    public partial class Ranks : System.Web.UI.Page
    {
        GameCrud gameCrud;

        protected void Page_Load(object sender, EventArgs e)
        {
            gameCrud = new GameCrud();
            gameCrud.AddRanksToGame();
        }
    }
}