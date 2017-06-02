using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class EventSponsor
    {
        [Key]
        public int Id { get; set; }
        public string LinkToFacebook { get; set; }

        public virtual Event Event { get; set; }
        public virtual Sponsor Sponsor { get; set; }
    }
}