namespace Server.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AfterDiscussions : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Articles", "LastEditDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.Articles", "LastEditUserID", c => c.Int(nullable: false));
            AddColumn("dbo.Events", "SponsorImage", c => c.String());
            AddColumn("dbo.Events", "MapImage", c => c.String());
            AddColumn("dbo.Events", "MapImageLink", c => c.String());
            AddColumn("dbo.Events", "IsPrevious", c => c.Boolean(nullable: false));
            DropColumn("dbo.Events", "ImagePath");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Events", "ImagePath", c => c.String());
            DropColumn("dbo.Events", "IsPrevious");
            DropColumn("dbo.Events", "MapImageLink");
            DropColumn("dbo.Events", "MapImage");
            DropColumn("dbo.Events", "SponsorImage");
            DropColumn("dbo.Articles", "LastEditUserID");
            DropColumn("dbo.Articles", "LastEditDate");
        }
    }
}
