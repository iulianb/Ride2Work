namespace Server.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CorrectedModels : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.EventSponsors", "Event_Id", "dbo.Events");
            DropForeignKey("dbo.EventSponsors", "Sponsor_Id", "dbo.Sponsors");
            DropIndex("dbo.EventSponsors", new[] { "Event_Id" });
            DropIndex("dbo.EventSponsors", new[] { "Sponsor_Id" });
            RenameColumn(table: "dbo.EventSponsors", name: "Event_Id", newName: "EventID");
            RenameColumn(table: "dbo.EventSponsors", name: "Sponsor_Id", newName: "SponsorID");
            AlterColumn("dbo.EventSponsors", "EventID", c => c.Int(nullable: false));
            AlterColumn("dbo.EventSponsors", "SponsorID", c => c.Int(nullable: false));
            CreateIndex("dbo.EventSponsors", "EventID");
            CreateIndex("dbo.EventSponsors", "SponsorID");
            AddForeignKey("dbo.EventSponsors", "EventID", "dbo.Events", "Id", cascadeDelete: true);
            AddForeignKey("dbo.EventSponsors", "SponsorID", "dbo.Sponsors", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.EventSponsors", "SponsorID", "dbo.Sponsors");
            DropForeignKey("dbo.EventSponsors", "EventID", "dbo.Events");
            DropIndex("dbo.EventSponsors", new[] { "SponsorID" });
            DropIndex("dbo.EventSponsors", new[] { "EventID" });
            AlterColumn("dbo.EventSponsors", "SponsorID", c => c.Int());
            AlterColumn("dbo.EventSponsors", "EventID", c => c.Int());
            RenameColumn(table: "dbo.EventSponsors", name: "SponsorID", newName: "Sponsor_Id");
            RenameColumn(table: "dbo.EventSponsors", name: "EventID", newName: "Event_Id");
            CreateIndex("dbo.EventSponsors", "Sponsor_Id");
            CreateIndex("dbo.EventSponsors", "Event_Id");
            AddForeignKey("dbo.EventSponsors", "Sponsor_Id", "dbo.Sponsors", "Id");
            AddForeignKey("dbo.EventSponsors", "Event_Id", "dbo.Events", "Id");
        }
    }
}
