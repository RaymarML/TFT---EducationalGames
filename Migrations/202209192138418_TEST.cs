namespace EducationalGames.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TEST : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.MatchPerDateCounters", "gameID", "dbo.Games");
            DropIndex("dbo.MatchPerDateCounters", new[] { "gameID" });
            DropTable("dbo.MatchPerDateCounters");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.MatchPerDateCounters",
                c => new
                    {
                        matchPerDateCounterID = c.Int(nullable: false, identity: true),
                        totalMatchCounter = c.Int(nullable: false),
                        totalPointsCounter = c.Int(nullable: false),
                        date = c.DateTime(nullable: false),
                        gameID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.matchPerDateCounterID);
            
            CreateIndex("dbo.MatchPerDateCounters", "gameID");
            AddForeignKey("dbo.MatchPerDateCounters", "gameID", "dbo.Games", "gameID", cascadeDelete: true);
        }
    }
}
