using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class EventSponsor
    {
        [Key]
        public int Id { get; set; }
        public string LinkToFacebook { get; set; }
        public int EventID { get; set; }
        public int SponsorID { get; set; }

        public virtual Event Event { get; set; }
        public virtual Sponsor Sponsor { get; set; }
    }
}