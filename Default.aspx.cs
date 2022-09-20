using System;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace EducationalGames
{
    public partial class _Default : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void getGames_CallingDataMethods(object sender, CallingDataMethodsEventArgs e)
        {
            e.DataMethodsObject = new Src.Crud.GameCrud();
        }
    }
}