using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Server.Models
{
    public class Articles
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string ImagePath { get; set; }
        public DateTime ArticleDate { get; set; }

        public virtual ICollection<Comments> Comments { get; set; }
    }
}