namespace Server.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Articles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        Content = c.String(),
                        ImagePath = c.String(),
                        ArticleDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Comments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Content = c.String(),
                        CommentDate = c.DateTime(nullable: false),
                        Article_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Articles", t => t.Article_Id)
                .Index(t => t.Article_Id);
            
            CreateTable(
                "dbo.Events",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        Description = c.String(),
                        ImagePath = c.String(),
                        VideoLink = c.String(),
                        EventDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.EventSponsors",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        LinkToFacebook = c.String(),
                        Event_Id = c.Int(),
                        Sponsor_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Events", t => t.Event_Id)
                .ForeignKey("dbo.Sponsors", t => t.Sponsor_Id)
                .Index(t => t.Event_Id)
                .Index(t => t.Sponsor_Id);
            
            CreateTable(
                "dbo.Sponsors",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        LogoLink = c.String(),
                        Name = c.String(),
                        SiteLink = c.String(),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserName = c.String(),
                        Password = c.Int(nullable: false),
                        Role = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.EventSponsors", "Sponsor_Id", "dbo.Sponsors");
            DropForeignKey("dbo.EventSponsors", "Event_Id", "dbo.Events");
            DropForeignKey("dbo.Comments", "Article_Id", "dbo.Articles");
            DropIndex("dbo.EventSponsors", new[] { "Sponsor_Id" });
            DropIndex("dbo.EventSponsors", new[] { "Event_Id" });
            DropIndex("dbo.Comments", new[] { "Article_Id" });
            DropTable("dbo.Users");
            DropTable("dbo.Sponsors");
            DropTable("dbo.EventSponsors");
            DropTable("dbo.Events");
            DropTable("dbo.Comments");
            DropTable("dbo.Articles");
        }
    }
}
