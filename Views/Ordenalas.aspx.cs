using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;

namespace EducationalGames.Views
{
    public partial class Ordenalas : System.Web.UI.Page
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
            Master.LoadSortGameWords(advanceDificulty.Checked);
        }
    }
}