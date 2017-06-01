using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class Events
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImagePath { get; set; }
        public string VideoLink { get; set; }
        public DateTime EventDate { get; set; }

        public virtual ICollection<EventsSponsors> EventsSponsors { get; set; }
    }
}