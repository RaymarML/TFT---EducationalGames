using System;
using System.Web;
using System.Web.Optimization;
using System.Web.Routing;
using EducationalGames.Src.Models;
using System.Data.Entity; 

namespace EducationalGames
{
    public class Global : HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {
            // Código que se ejecuta al iniciar la aplicación
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            Database.SetInitializer(new GameInitializer());
        }
    }
}