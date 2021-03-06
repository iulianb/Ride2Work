﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class Sponsor
    {
        [Key]
        public int Id { get; set; }
        public string LogoLink { get; set; }
        public string Name { get; set; }
        public string SiteLink { get; set; }
        public string Description { get; set; }

        public virtual ICollection<EventSponsor> EventsSponsors { get; set; }
    }
}