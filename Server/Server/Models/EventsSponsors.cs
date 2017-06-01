using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Server.Models
{
    public class EventsSponsors
    {
        [Key]
        public int Id { get; set; }
        public string LinkToFacebook { get; set; }

        public virtual Events Event { get; set; }
        public virtual Sponsors Sponsor { get; set; }
    }
}