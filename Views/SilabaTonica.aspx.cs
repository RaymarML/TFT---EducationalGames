using System;

namespace EducationalGames.Views
{
    public partial class SilabaTonica : System.Web.UI.Page
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
            Master.LoadStressedSyllableSelectorGame(advanceDificulty.Checked);
        }
    }
}