using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Server.Models
{
    public class Comments
    {
        [Key]
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime CommentDate { get; set; }
        public string Name { get; set; }

        public virtual Articles Article { get; set; }
    }
}