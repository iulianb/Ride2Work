namespace Server.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedArticleIDToComment : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Comments", "Article_Id", "dbo.Articles");
            DropIndex("dbo.Comments", new[] { "Article_Id" });
            RenameColumn(table: "dbo.Comments", name: "Article_Id", newName: "ArticleID");
            AlterColumn("dbo.Comments", "ArticleID", c => c.Int(nullable: false));
            CreateIndex("dbo.Comments", "ArticleID");
            AddForeignKey("dbo.Comments", "ArticleID", "dbo.Articles", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Comments", "ArticleID", "dbo.Articles");
            DropIndex("dbo.Comments", new[] { "ArticleID" });
            AlterColumn("dbo.Comments", "ArticleID", c => c.Int());
            RenameColumn(table: "dbo.Comments", name: "ArticleID", newName: "Article_Id");
            CreateIndex("dbo.Comments", "Article_Id");
            AddForeignKey("dbo.Comments", "Article_Id", "dbo.Articles", "Id");
        }
    }
}
