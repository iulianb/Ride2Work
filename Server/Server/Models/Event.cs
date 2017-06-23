using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class Event
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string SponsorImage { get; set; }
        public string MapImage { get; set; }
        public string MapImageLink { get; set; }
        public string VideoLink { get; set; }
        public DateTime EventDate { get; set; }
        public bool IsPrevious { get; set; }

        public virtual ICollection<EventSponsor> EventsSponsors { get; set; }
    }
}