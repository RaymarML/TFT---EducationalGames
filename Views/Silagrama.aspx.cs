using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace EducationalGames.Views
{
    public partial class Silagrama : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            this.LoadWords();
        }

        protected void toggleAdvanceDificulty(object sender, EventArgs e)
        {
            this.LoadWords();
        }

        private void LoadWords()
        {
            Master.LoadSyllableSortGame(advanceDificulty.Checked);
        }
    }
}