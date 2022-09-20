using System;
using System.Web.UI;

namespace EducationalGames.Views
{
    public partial class Preguntas : System.Web.UI.Page
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
            Master.LoadQuestionGameWords(advanceDificulty.Checked);
        }
    }
}
