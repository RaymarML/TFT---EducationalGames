namespace EducationalGames.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initialize : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Games",
                c => new
                    {
                        gameID = c.Int(nullable: false, identity: true),
                        name = c.String(),
                        url = c.String(),
                    })
                .PrimaryKey(t => t.gameID);
            
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
                .PrimaryKey(t => t.matchPerDateCounterID)
                .ForeignKey("dbo.Games", t => t.gameID, cascadeDelete: true)
                .Index(t => t.gameID);
            
            CreateTable(
                "dbo.Ranks",
                c => new
                    {
                        rankID = c.Int(nullable: false),
                        gameID = c.Int(),
                    })
                .PrimaryKey(t => t.rankID)
                .ForeignKey("dbo.Games", t => t.rankID)
                .Index(t => t.rankID);
            
            CreateTable(
                "dbo.RankItems",
                c => new
                    {
                        rankItemID = c.Int(nullable: false, identity: true),
                        rankID = c.Int(nullable: false),
                        position = c.Int(nullable: false),
                        playerName = c.String(),
                        points = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.rankItemID)
                .ForeignKey("dbo.Ranks", t => t.rankID, cascadeDelete: true)
                .Index(t => t.rankID);
            
            CreateTable(
                "dbo.TestWords",
                c => new
                    {
                        wordID = c.Int(nullable: false, identity: true),
                        completeWord = c.String(),
                        syllables = c.String(),
                        stressedSyllable = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.wordID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.RankItems", "rankID", "dbo.Ranks");
            DropForeignKey("dbo.Ranks", "rankID", "dbo.Games");
            DropForeignKey("dbo.MatchPerDateCounters", "gameID", "dbo.Games");
            DropIndex("dbo.RankItems", new[] { "rankID" });
            DropIndex("dbo.Ranks", new[] { "rankID" });
            DropIndex("dbo.MatchPerDateCounters", new[] { "gameID" });
            DropTable("dbo.TestWords");
            DropTable("dbo.RankItems");
            DropTable("dbo.Ranks");
            DropTable("dbo.MatchPerDateCounters");
            DropTable("dbo.Games");
        }
    }
}
