using System;
using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class Comment
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public DateTime CommentDate { get; set; }

        public virtual Article Article { get; set; }
    }
}